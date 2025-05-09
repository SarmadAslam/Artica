import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { createArticleComment } from '../controllers/article_comment_controller.js';

const router = express.Router();

// POST /api/comments
router.post('/create', verifyToken, createArticleComment);

export default router;