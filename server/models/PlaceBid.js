import mongoose from 'mongoose';

const BidSchema = new mongoose.Schema({
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
    bidAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'won', 'lost', 'withdrawn'],
        default: 'active'
    },
    bidTime: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Bid = mongoose.model('Bid', BidSchema);

export default Bid;