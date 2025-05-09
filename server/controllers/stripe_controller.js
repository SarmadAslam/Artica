import Purchase from '../models/Purchase.js';
import ShowArtWork from '../models/ShowArtWork.js';
import User from '../models/User.js';
import Stripe from 'stripe';  // Corrected import for Stripe

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { artworkId } = req.params;
        const userId = req.user.id;

        const artwork = await ShowArtWork.findById(artworkId);
        if (!artwork) {
            return res.status(404).json({ success: false, message: 'Artwork not found' });
        }

        if (!artwork.availableForPurchase) {
            return res.status(400).json({
                success: false,
                message: 'This artwork is not available for purchase'
            });
        }

        if (!artwork.price || artwork.price <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid artwork price'
            });
        }

        // Create a purchase record
        const purchase = new Purchase({
            user: userId,
            artwork: artworkId,
            amount: artwork.price,
            status: 'pending'
        });
        await purchase.save();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: artwork.title,
                        description: artwork.description,
                        images: [artwork.image], // Assuming artwork.image is a URL string
                    },
                    unit_amount: Math.round(artwork.price * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `http://localhost:5173/payment-success?purchaseId=${purchase._id}`,
            cancel_url: `http://localhost:5173/payment-cancelled`,
            metadata: {
                purchaseId: purchase._id.toString(),
                userId: userId,
                artworkId: artworkId
            },
            payment_intent_data: {} // Makes session.payment_intent available
        });

        // Save session ID to the purchase if needed
        purchase.paymentIntentId = session.payment_intent;
        await purchase.save();

        res.json({ success: true, url: session.url });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const confirmDirectStripePayment = async (req, res) => {
    try {
        const { purchaseId } = req.body;
        const userId = req.user.id;

        const purchase = await Purchase.findById(purchaseId)
            .populate('artwork')
            .populate('user');

        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase not found' });
        }

        if (purchase.user._id.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        if (purchase.status === 'completed') {
            return res.status(200).json({ success: true, message: 'Purchase already confirmed' });
        }

        // Mark the purchase as completed
        purchase.status = 'completed';
        await purchase.save();

        // Add to user's purchases
        const user = await User.findById(userId);
        if (user && !user.purchases.includes(purchase._id)) {
            user.purchases.push(purchase._id);
            await user.save();
        }

        res.json({ success: true, message: 'Purchase confirmed', purchase });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Export both functions
export default {
    createCheckoutSession,
    confirmDirectStripePayment
};
