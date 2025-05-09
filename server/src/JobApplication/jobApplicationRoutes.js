import express from 'express';
import multer from 'multer';
import path from 'path';
import { createApplication } from './jobApplicationController.js';

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  '/apply',
  upload.fields([
    { name: 'coverLetter', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 }
  ]),
  createApplication
);

export default router;
