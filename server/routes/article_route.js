import express from 'express';
const router = express.Router();

import {
    createArticle,
    updateArticle,
    getAllArticles,
    getArticleById,
    deleteArticle,
    getMyArticles,
} from '../controllers/article_controller.js';

import {verifyToken} from '../utils/verifyToken.js';

// Public Routes
router.get('/all', getAllArticles);
router.get('/getById/:id', getArticleById);

// Protected Routes
router.post('/create', verifyToken, createArticle);
router.put('/update:id',verifyToken , updateArticle);
router.delete('/delete/:id', verifyToken, deleteArticle);


router.get('/my-articles', verifyToken, getMyArticles);


export default router;
