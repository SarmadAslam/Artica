import express from 'express';
const router = express.Router();
import artworkController from '../controllers/bidplace_controller.js';
import {verifyToken} from '../utils/verifyToken.js';

// Bid-related routes
router.post('/create', verifyToken, artworkController.placeBid);
router.get('/bids/:artworkId', artworkController.getBidsForArtwork);
router.get('/highest-bid/:artworkId', artworkController.getHighestBid);
router.get('/user/bids', verifyToken, artworkController.getUserBids);
router.delete('/bid/:bidId', verifyToken, artworkController.withdrawBid);
router.get('/history', verifyToken, artworkController.bidHistory);



export default router;