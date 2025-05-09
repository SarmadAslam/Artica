import { Router } from 'express';

// Importing controllers and middleware
import { register, verifyOTP, resendOTP, login, forgotPassword, logout, resetPassword,fetchUser,updateUserProfile } from '../../controllers/auth-controller/authController.js';
import { verifyToken } from '../../utils/verifyToken.js';

const router = Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

router.get('/getprofile',verifyToken, fetchUser);


router.post('/updateUserProfile',verifyToken, updateUserProfile);











export default router;