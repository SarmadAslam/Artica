import path from 'path';
import fs from 'fs';
import multer from 'multer';
import {v4 as uuidv4} from 'uuid';
import Article from '../models/Article.js';
import User from '../models/User.js';

// Shared Upload Function
const uploadImage = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join('files/articles');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            cb(null, uuidv4() + path.extname(file.originalname));
        }
    });
    return multer({ storage }).single('coverImage');
};

// Create Article
export const createArticle = (req, res) => {
    uploadImage()(req, res, async function (err) {
        if (err) return res.status(400).json({ success: false, message: err.message });

        try {
            const { title, description, tags, category } = req.body;

            const userId = req.user.id;
            if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const coverImagePath = req.file ? `files/articles/${req.file.filename}` : '';

            const article = new Article({
                title,
                description,
                tags: tags ? tags.split(',') : [],
                category,
                coverImage: coverImagePath,
                author: userId
            });

            await article.save();

            await User.findByIdAndUpdate(userId, {
                $push: { articles: article._id }
            });

            res.status(201).json({
                
                success: true,
                message : "Article Created Successfully",
                data: article });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Update Article
export const updateArticle = (req, res) => {
    uploadImage()(req, res, async function (err) {
        if (err) return res.status(400).json({ success: false, message: err.message });

        try {
            const article = await Article.findById(req.params.id);
            if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

            if (article.author.toString() !== req.user.id)
                return res.status(403).json({ success: false, message: 'Unauthorized' });

            const { title, description, tags, category } = req.body;

            article.title = title || article.title;
            article.description = description || article.description;
            article.category = category || article.category;
            article.tags = tags ? tags.split(',') : article.tags;

            // Update cover image if new one is uploaded
            if (req.file) {
                if (article.coverImage) {
                    const oldImagePath = path.join(__dirname, '../', article.coverImage);
                    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
                }
                article.coverImage = `files/articles/${req.file.filename}`;
            }

            await article.save();

            res.json({ success: true, data: article });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
};

// Get All Articles
export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().populate('author', 'username profilePic');
        res.json({ success: true, data: articles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getArticleById = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id)
        .populate('author', 'username profilePic')
        .populate({
          path: 'comments',
          match: { parentComment: null }, // Only top-level comments
          populate: [
            {
              path: 'author',
              select: 'username profilePic',
            },
            {
              path: 'replies',
              populate: {
                path: 'author',
                select: 'username profilePic',
              },
            },
          ],
        });
  
      if (!article) {
        return res.status(404).json({ success: false, message: 'Article not found' });
      }
  
      res.status(200).json({ success: true, data: article });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };



// Delete Article
export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

        if (article.author.toString() !== req.user.id)
            return res.status(403).json({ success: false, message: 'Unauthorized' });

        // Remove image from server
        if (article.coverImage) {
            const imagePath = path.join(__dirname, '../', article.coverImage);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await Article.findByIdAndDelete(req.params.id);

        await User.findByIdAndUpdate(req.user.id, {
            $pull: { articles: req.params.id }
        });

        res.json({ success: true, message: 'Article deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getMyArticles = async (req, res) => {
    try {
      const articles = await Article.find({ author: req.user.id }).sort({ createdAt: -1 });
  
      res.json({ success: true, articles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export default {
    createArticle,
    updateArticle,
    getAllArticles,
    getArticleById,
    deleteArticle,
    getMyArticles
};
