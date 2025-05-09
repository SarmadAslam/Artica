
import express from 'express';
const router = express.Router();
import {createCheckoutSession, confirmDirectStripePayment} from '../controllers/stripe_controller.js';
import {verifyToken} from '../utils/verifyToken.js';


router.post('/checkout/:artworkId', verifyToken, createCheckoutSession);

// @route   POST /api/purchase/confirm
// @desc    Confirm payment after successful redirect (no webhook)
router.post('/confirm', verifyToken, confirmDirectStripePayment);

export default router;
