import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import ShowArtWork from '../models/ShowArtWork.js';
import User from '../models/User.js';
import Purchase from "../models/Purchase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


 // Multer Storage Configuration
 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
         const uploadPath = path.join('files/showartwork');
         if (!fs.existsSync(uploadPath)) {
             fs.mkdirSync(uploadPath, { recursive: true });
         }
         cb(null, uploadPath);
     },
     filename: function (req, file, cb) {
         cb(null, uuidv4() + path.extname(file.originalname));
     }
 });

 const upload = multer({ storage: storage }).array('images');

 export const createArtwork = (req, res) => {
     upload(req, res, async function (err) {
         if (err) {
             return res.status(400).json({ success: false, message: err.message });
         }

         try {
             let {
                 title,
                 description,
                 category,
                 tags,
                 startingBid,
                 minIncrement,
                 price,
                 biddingDuration
             } = req.body;

             // Convert to proper types
             price = price ? Number(price) : 0;
             startingBid = startingBid ? Number(startingBid) : null;
             minIncrement = minIncrement ? Number(minIncrement) : null;
             biddingDuration = biddingDuration ? Number(biddingDuration) : null;

             // Determine if it's purchase-only
             const isForPurchaseOnly = price > 0 && !startingBid;

             // Basic required field check
             if (!title || !description || !category) {
                 return res.status(400).json({
                     success: false,
                     message: 'Missing required fields: title, description, or category.'
                 });
             }

             // Must have at least one way to acquire
             if (!startingBid && price === 0) {
                 return res.status(400).json({
                     success: false,
                     message: 'Please provide either startingBid for auction or price for purchase.'
                 });
             }

             // Validate numbers
             if (startingBid && isNaN(startingBid)) {
                 return res.status(400).json({ success: false, message: 'Invalid startingBid' });
             }

             if (biddingDuration && isNaN(biddingDuration)) {
                 return res.status(400).json({ success: false, message: 'Invalid biddingDuration' });
             }

             if (minIncrement && isNaN(minIncrement)) {
                 return res.status(400).json({ success: false, message: 'Invalid minIncrement' });
             }

             // Image check
             if (!req.files || req.files.length === 0) {
                 return res.status(400).json({ success: false, message: 'Please upload at least one image' });
             }

             const images = req.files.map(file => `files/showartwork/${file.filename}`);
             const userId = req.user.id;

             if (!userId) {
                 return res.status(401).json({ success: false, message: 'Unauthorized access' });
             }

             // Build the new artwork
             const artwork = new ShowArtWork({
                 title,
                 description,
                 category,
                 tags,
                 price,
                 images,
                 createdBy: userId,
                 availableForPurchase: isForPurchaseOnly,
                 type: isForPurchaseOnly ? 'purchase' : 'auction'
             });

             // Set auction-related fields only if not purchase-only
             if (!isForPurchaseOnly) {
                 artwork.startingBid = startingBid;
                 artwork.minIncrement = minIncrement;
                 artwork.biddingDuration = biddingDuration;
             }

             await artwork.save();

             const user = await User.findById(userId);
             if (!user) {
                 return res.status(404).json({ success: false, message: 'User not found' });
             }

             user.ShowArtWork.push(artwork._id);
             await user.save();

             res.status(201).json({ success: true, data: artwork });

         } catch (err) {
             console.error(err);
             res.status(400).json({ success: false, message: err.message });
         }
     });
 };


 export const getAuctionArtworks = async (req, res) => {
     try {
         const auctionArtworks = await ShowArtWork.find({ type: 'auction' }).sort({ createdAt: -1 });
         res.status(200).json({ success: true, data: auctionArtworks });
     } catch (err) {
         console.error(err);
         res.status(500).json({ success: false, message: 'Failed to fetch auction artworks' });
     }
 };

 export const getPurchaseArtworks = async (req, res) => {
     try {
         const purchaseArtworks = await ShowArtWork.find({ type: 'purchase' }).sort({ createdAt: -1 });
         res.status(200).json({ success: true, data: purchaseArtworks });
     } catch (err) {
         console.error(err);
         res.status(500).json({ success: false, message: 'Failed to fetch purchase artworks' });
     }
 };






 export const getAllArtworks = async (req, res) => {
     try {
         const artworks = await ShowArtWork.find()
         .populate('createdBy')
         .populate({
             path: 'bids',
             populate: {
                 path: 'user', // Populating user inside bids array
                 model: 'User' // Replace 'User' with your actual User model name
             }
         });
         ;
         res.json({ success: true, data: artworks });
     } catch (err) {
         res.status(500).json({ success: false, message: err.message });
     }
 };

 export const getArtworkById = async (req, res) => {
     try {
       const artwork = await ShowArtWork.findById(req.params.id)
         .populate('createdBy')
         .populate({
           path: 'bids',
           populate: {
             path: 'user',
             model: 'User',
           },
         })
         .populate({
           path: 'comments',
           populate: [
             {
               path: 'user',
               select: 'username profilePic',
             },
             {
               path: 'replies',
               populate: {
                 path: 'user',
                 select: 'username profilePic',
               },
             },
           ],
         });
   
       if (!artwork) {
         return res.status(404).json({ success: false, message: 'Artwork not found' });
       }
   
       res.json({ success: true, data: artwork });
     } catch (err) {
       res.status(500).json({ success: false, message: err.message });
     }
   };



 export const searchArtworksByTitle = async (req, res) => {
     try {
         const { title } = req.query;
         
         if (!title || title.trim() === '') {
             return res.status(400).json({ 
                 success: false, 
                 message: 'Search query (title) is required' 
             });
         }

         const artworks = await ShowArtWork.find({
             title: { $regex: title, $options: 'i' },
             status: 'active' // Optional: only search active artworks
         }).sort({ createdAt: -1 }); // Sort by newest first

         res.status(200).json({ 
             success: true, 
             count: artworks.length,
             data: artworks 
         });
     } catch (err) {
         res.status(500).json({ 
             success: false, 
             message: err.message 
         });
     }
 };

 export const updateArtwork = (req, res) => {
     upload(req, res, async function (err) {
         if (err) {
             return res.status(400).json({ success: false, message: err.message });
         }
         try {
             const { title, description, category, tags, startingBid, minIncrement, biddingDuration, price } = req.body;
             const artwork = await ShowArtWork.findById(req.params.id);
             if (!artwork) {
                 return res.status(404).json({ success: false, message: 'Artwork not found' });
             }

             let images = artwork.images;
             if (req.files && req.files.length > 0) {
                 artwork.images.forEach(image => {
                     fs.unlinkSync(image);
                 });
                 images = req.files.map(file => `files/showartwork/${file.filename}`);
             }

             artwork.title = title || artwork.title;
             artwork.description = description || artwork.description;
             artwork.category = category || artwork.category;
             artwork.tags = tags || artwork.tags;
             artwork.startingBid = startingBid || artwork.startingBid;
             artwork.minIncrement = minIncrement || artwork.minIncrement;
             artwork.biddingDuration = biddingDuration || artwork.biddingDuration;
             artwork.images = images;
             artwork.biddingDuration = biddingDuration || artwork.biddingDuration;
             artwork.price = price || artwork.price;


             await artwork.save();
             res.json({ success: true, data: artwork });
         } catch (err) {
             res.status(400).json({ success: false, message: err.message });
         }
     });
 };


 export const deleteArtwork = async (req, res) => {
     try {
         const artwork = await ShowArtWork.findById(req.params.id);
         if (!artwork) {
             return res.status(404).json({ success: false, message: 'Artwork not found' });
         }

         artwork.images.forEach(image => {
             fs.unlinkSync(image);
         });

         await artwork.remove();
         res.json({ success: true, message: 'Artwork deleted' });
     } catch (err) {
         res.status(500).json({ success: false, message: err.message });
     }
 };


 export const getArtworkByCategory = async (req, res) => {
     try {
         const { category } = req.params;

          const artworks = await ShowArtWork.find({ category: category })
          .populate('createdBy')
    
          ;

         if (!artworks || artworks.length === 0) {
             return res.status(404).json({ success: false, message: 'No artworks found in this category' });
         }

         res.json({ success: true, data: artworks });
     } catch (err) {
         res.status(500).json({ success: false, message: err.message });
     }
 };


 export const createStripePaymentIntent = async (req, res) => {
     try {
         const { artworkId } = req.params;
         const userId = req.user.id;

         // Find the artwork
         const artwork = await ShowArtWork.findById(artworkId);
         if (!artwork) {
             return res.status(404).json({ success: false, message: 'Artwork not found' });
         }

         // Check if the artwork is available for purchase
         if (!artwork.availableForPurchase) {
             return res.status(400).json({ 
                 success: false, 
                 message: 'This artwork is not available for purchase' 
             });
         }

         // Create a purchase record first
         const purchase = new Purchase({
             user: userId,
             artwork: artworkId,
             status: 'pending'
         });
         await purchase.save();

         // Create a payment intent
         const paymentIntent = await stripe.paymentIntents.create({
             amount: Math.round(artwork.price * 100), // Stripe uses cents
             currency: 'usd',
             metadata: {
                 purchaseId: purchase._id.toString(),
                 userId: userId,
                 artworkId: artworkId
             }
         });

         // Update purchase with payment intent ID
         purchase.paymentIntentId = paymentIntent.id;
         purchase.amount = artwork.price;
         await purchase.save();

         res.json({
             success: true,
             clientSecret: paymentIntent.client_secret,
             purchaseId: purchase._id
         });

     } catch (err) {
         res.status(500).json({ success: false, message: err.message });
     }
 };

 export const confirmStripePayment = async (req, res) => {
     try {
         const { purchaseId } = req.body;
         const userId = req.user.id;

         // Find the purchase record
         const purchase = await Purchase.findById(purchaseId)
             .populate('artwork')
             .populate('user');

         if (!purchase) {
             return res.status(404).json({ success: false, message: 'Purchase record not found' });
         }

         // Verify the user owns this purchase
         if (purchase.user._id.toString() !== userId) {
             return res.status(403).json({ success: false, message: 'Unauthorized' });
         }

         // Retrieve the payment intent from Stripe
         const paymentIntent = await stripe.paymentIntents.retrieve(purchase.paymentIntentId);

         // Verify the payment was successful
         if (paymentIntent.status !== 'succeeded') {
             return res.status(400).json({ 
                 success: false, 
                 message: 'Payment not completed' 
             });
         }

         // Update purchase status
         purchase.status = 'completed';
         await purchase.save();

         const user = await User.findById(userId);
         if (user) {
             user.purchases.push(purchase._id);
             await user.save();
         }
         res.json({ 
             success: true, 
             message: 'Payment confirmed and purchase completed',
             purchase: purchase
         });

     } catch (err) {
         res.status(500).json({ success: false, message: err.message });
     }
 };

 export const getUserPurchases = async (req, res) => {
     try {
         const userId = req.user.id;
         
         const purchases = await Purchase.find({ user: userId })
             .populate('artwork')
             .sort({ purchaseDate: -1 });

         res.json({ success: true, data: purchases });
     } catch (err) {
         res.status(500).json({ success: false, message: err.message });
     }
 };

 export default {
     createArtwork,
     getAllArtworks,
     getArtworkById,
     updateArtwork,
     deleteArtwork,
     getArtworkByCategory,
     createStripePaymentIntent,
     confirmStripePayment,
     getUserPurchases,
     searchArtworksByTitle,
     getAuctionArtworks,
     getPurchaseArtworks

 };
