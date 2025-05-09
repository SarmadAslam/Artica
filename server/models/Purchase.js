import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    artwork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShowArtWork',
        required: true
    },
    paymentIntentId: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    // Add any other relevant fields
    // like shipping address, download links, etc.
}, { timestamps: true });

export default mongoose.model('Purchase', PurchaseSchema);