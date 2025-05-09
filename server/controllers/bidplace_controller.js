import Bid from '../models/PlaceBid.js';
import ShowArtWork from '../models/ShowArtWork.js';
import User from '../models/User.js';

const placeBid = async (req, res) => {
   try {
       const { artworkId, bidAmount } = req.body;
       const userId = req.user.id;

       // Validate input
       if (!artworkId || !bidAmount || isNaN(bidAmount)) {
           return res.status(400).json({
               success: false,
               message: 'Artwork ID and valid bid amount are required'
           });
       }

       // Find artwork and check status
       const artwork = await ShowArtWork.findById(artworkId);
       if (!artwork) {
           return res.status(404).json({
               success: false,
               message: 'Artwork not found'
           });
       }

       // Check if bidding is still open
       if (artwork.status !== 'active' || new Date() > artwork.expiresAt) {
           return res.status(400).json({
               success: false,
               message: 'Bidding period has ended'
           });
       }

       // Calculate minimum required bid
       const minBid = artwork.currentBid > 0
           ? artwork.currentBid + artwork.minIncrement
           : artwork.startingBid;

       if (bidAmount < minBid) {
           return res.status(400).json({
               success: false,
               message: `Bid must be at least ${minBid}`,
               minRequiredBid: minBid
           });
       }

       // Create new bid
       const bid = new Bid({
           user: userId,
           artwork: artworkId,
           bidAmount: Number(bidAmount),
           status: 'active'
       });

       await bid.save();

       // Update artwork
       artwork.currentBid = bid.bidAmount;
       artwork.bids.push(bid._id);
       await artwork.save();

       // Update user's bids
       await User.findByIdAndUpdate(userId, {
           $push: { bids: bid._id }
       });

       res.status(201).json({
           success: true,
           data: bid,
           message: 'Bid placed successfully'
       });

   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   }
};

const getBidsForArtwork = async (req, res) => {
   try {
       const { artworkId } = req.params;

       const bids = await Bid.find({ artwork: artworkId })
           .populate('user', 'username email')
           .sort({ bidAmount: -1 });

       res.json({
           success: true,
           data: bids
       });
   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   }
};

const getUserBids = async (req, res) => {
   try {
       const userId = req.user.id;

       const bids = await Bid.find({ user: userId })
           .populate({
               path: 'artwork',
               select: 'title images currentBid status expiresAt'
           })
           .sort({ bidTime: -1 });

       res.json({
           success: true,
           data: bids
       });
   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   }
};

const withdrawBid = async (req, res) => {
   try {
       const { bidId } = req.params;
       const userId = req.user.id;

       const bid = await Bid.findById(bidId);
       if (!bid) {
           return res.status(404).json({
               success: false,
               message: 'Bid not found'
           });
       }

       // Check if user owns the bid
       if (bid.user.toString() !== userId) {
           return res.status(403).json({
               success: false,
               message: 'Unauthorized to withdraw this bid'
           });
       }

       // Check if bid can be withdrawn
       if (bid.status !== 'active') {
           return res.status(400).json({
               success: false,
               message: 'Only active bids can be withdrawn'
           });
       }

       // Find the artwork
       const artwork = await ShowArtWork.findById(bid.artwork);
       if (!artwork) {
           return res.status(404).json({
               success: false,
               message: 'Artwork not found'
           });
       }

       // Check if bidding is still open
       if (artwork.status !== 'active' || new Date() > artwork.expiresAt) {
           return res.status(400).json({
               success: false,
               message: 'Cannot withdraw bid after auction has ended'
           });
       }

       // Update bid status
       bid.status = 'withdrawn';
       await bid.save();

       // Update artwork if this was the current highest bid
       if (artwork.currentBid === bid.bidAmount) {
           // Find the next highest active bid
           const nextBid = await Bid.findOne({
               artwork: artwork._id,
               status: 'active',
               _id: { $ne: bid._id }
           }).sort({ bidAmount: -1 });

           artwork.currentBid = nextBid ? nextBid.bidAmount : artwork.startingBid;
           await artwork.save();
       }

       res.json({
           success: true,
           message: 'Bid withdrawn successfully'
       });
   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   }
};

const getHighestBid = async (req, res) => {
   try {
       const { artworkId } = req.params;

       const highestBid = await Bid.findOne({ artwork: artworkId })
           .sort({ bidAmount: -1 })
           .populate('user', 'username');

       if (!highestBid) {
           return res.json({
               success: true,
               data: null,
               message: 'No bids placed yet'
           });
       }

       res.json({
           success: true,
           data: highestBid
       });
   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   }
};


const bidHistory = async (req, res) => {
   try {
       const userId = req.user.id;

       const bids = await Bid.find({ user: userId })
           .populate({
               path: 'artwork',
               select: 'title images startingBid currentBid status expiresAt'
           })
           .sort({ bidTime: -1 });

       const history = bids.map(bid => ({
           bidId: bid._id,
           bidAmount: bid.bidAmount,
           status: bid.status,
           bidTime: bid.bidTime,
           artwork: {
               id: bid.artwork._id,
               title: bid.artwork.title,
               image: bid.artwork.images?.[0],  
               startingBid: bid.artwork.startingBid,
               currentBid: bid.artwork.currentBid,
               status: bid.artwork.status,
               expiresAt: bid.artwork.expiresAt,
           }
       }));

       res.json({
           success: true,
           data: history
       });
   } catch (err) {
       res.status(500).json({
           success: false,
           message: err.message
       });
   }
};


export default {
    placeBid,
    getBidsForArtwork,
    getUserBids,
    withdrawBid,
    getHighestBid,
    bidHistory
};