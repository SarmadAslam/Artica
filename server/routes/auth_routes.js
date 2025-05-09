import express from 'express';

import {
 signup,
 login,
 updateUserInfo,
 updateAbout,
 uploadProfilePic,
 fetchUser,
 updateUserProfile,
 getAllUsers,
 getUserById,
} from '../controllers/auth_controller.js';

import {verifyToken} from '../utils/verifyToken.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: "Authentication related endpoints"
 * 
 * /auth/signup:
 *   post:
 *     summary: "Create a new user"
 *     description: "Create a new user by providing the username, email, and password"
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: "User created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: "Bad request - missing fields or user already exists"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: "Internal server error"
 */

router.post('/signup', signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: "User login"
 *     description: "Log in a user by providing email and password"
 *     tags:
 *       - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Login successful"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: "Bad request - invalid email or password"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: "Internal server error"
 */

router.post('/login', login);
router.post('/updateUserInfo',verifyToken,  updateUserInfo);
router.post('/updateAbout', verifyToken, updateAbout);
router.post('/uploadProfilePic', verifyToken, uploadProfilePic);

router.get('/getprofile', verifyToken, fetchUser);


router.post('/updateUserProfile', verifyToken, updateUserProfile);


router.get('/getAllUsers', getAllUsers);

router.get('/users/:id', getUserById);











export default router;
