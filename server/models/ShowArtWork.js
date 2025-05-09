import mongoose from 'mongoose';

const ArtworkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    startingBid: {
        type: Number,
        required: false,
        min: 0
    },
    currentBid: {
        type: Number,
        default: 0
    },
    availableForPurchase: {
        type: Boolean,
        default: true
    },
    price: { // Add price field
        type: Number,
        required: false,
        default : 0
    },
    minIncrement: {
        type: Number,
        required: false,
        min: 1
    },
    biddingDuration: {
        type: Number, // in days
        required: false,
    },
    images: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'expired'],
        default: 'active'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['auction', 'purchase'],
        default: 'auction'
      },

    winningBid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    },
    bids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    }],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default : ""
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date
    }
}, { timestamps: true });

// Calculate expiration date before saving
ArtworkSchema.pre('save', function(next) {
    if (this.isNew) {
        const durationInMs = this.biddingDuration * 24 * 60 * 60 * 1000;
        this.expiresAt = new Date(this.createdAt.getTime() + durationInMs);
    }
    next();
});

// Static method to check and update expired artworks
ArtworkSchema.statics.updateExpiredArtworks = async function() {
    const now = new Date();
    await this.updateMany(
        { 
            status: 'active',
            expiresAt: { $lte: now }
        },
        { 
            status: 'expired'
        }
    );
};

const ShowArtWork = mongoose.model('ShowArtWork', ArtworkSchema);

// Regularly check for expired artworks (every hour)
setInterval(async () => {
    await ShowArtWork.updateExpiredArtworks();
}, 3600000);

export default ShowArtWork;
