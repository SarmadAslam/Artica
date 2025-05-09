// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
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
    bidTime: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    },
    paymentStatus: { 
        type: String, 
        enum: ['unpaid', 'paid'], 
        default: 'unpaid' 
    },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

export default Order;
