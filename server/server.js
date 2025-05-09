import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import fs from "fs";

// ===== Sarmad - Imports =====
import authRoutes from "./routes/auth-routes/authRoutes.js";
import adminRoutes from "./routes/admin-routes/adminRoutes.js";
import authenticateToken from "./middleware/authMiddleware.js";
import competitionRoutes from "./routes/competitionRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import exhibitionRoutes from "./routes/exhibitionRoutes.js";

// ===== Rabail - Imports =====
import postJobRoutes from "./src/postJob/postJob.routes.js";
import profileRoutes from "./src/clientProfile/clientProfile.routes.js";
import artworkRoutes from './src/participateInExhibition/artwork.routes.js';
import jobApplicationRoutes from './src/JobApplication/jobApplicationRoutes.js';

// ===== Eisha - Imports =====
import artRoutes from './routes/art_routes.js';
import showartRoutes from './routes/show_art_routes.js';
import PlaceBidRoutes from './routes/PlaceBid_route.js';
import StripeRoutes from './routes/stripe_route.js';
import ArticleRoutes from './routes/article_route.js';
import CommentRoutes from './routes/commetn_route.js';
import ArticleComment from './routes/article_comment_route.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Enable CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
  ],
  methods: "GET,POST, PUT, DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(cookieParser());

// Connect to MongoDB
connectDB();

// ===== Static Files Setup =====
const createDirIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

createDirIfNotExists(join(__dirname, 'job-uploads'));
createDirIfNotExists(join(__dirname, 'artwork-uploads'));
createDirIfNotExists('./uploads');

app.use('/uploads', express.static(join(__dirname, 'job-uploads')));
app.use('/artwork-uploads', express.static(join(__dirname, 'artwork-uploads')));
app.use("/files/profiles", express.static("files/profiles"));
app.use("/files/arts", express.static("files/arts"));
app.use("/files/showartwork", express.static("files/showartwork"));
app.use("/files/articles", express.static("files/articles"));

// ===== Routes Configuration =====

// --- Sarmad Routes ---
app.use("/api/auth", authRoutes);  // Non-v1 auth
app.use("/api/admin", adminRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/exhibitions", exhibitionRoutes);
app.use("/api/news", newsRoutes);

// --- Rabail Routes ---
app.use("/api/jobs", postJobRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/artwork", artworkRoutes);
app.use("/api", jobApplicationRoutes);

// --- Eisha Routes ---
app.use("/api/v1/auth", authRoutes);  // v1 auth route
// app.use("/api/v1/art", artRoutes);  // Uncomment if needed
app.use("/api/v1/showartwork", showartRoutes);
app.use("/api/v1/bids", PlaceBidRoutes);
app.use("/api/v1/stripe", StripeRoutes);
app.use("/api/v1/article", ArticleRoutes);
app.use("/api/v1/comment", CommentRoutes);
app.use("/api/v1/articlecomment", ArticleComment);

// ===== Error Handling =====
app.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
