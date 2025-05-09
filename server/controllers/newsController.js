import { News } from "../models/news.js";

// GET all news
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch news", error: err.message });
  }
};

// POST new article
export const createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    if (news.published) {
      news.publishedAt = new Date();
    }
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ message: "Failed to create news", error: err.message });
  }
};

// PUT update article
export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        publishedAt: req.body.published ? news.publishedAt ?? new Date() : null,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update news", error: err.message });
  }
};

// DELETE article
export const deleteNews = async (req, res) => {
  try {
    const deleted = await News.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "News not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete news", error: err.message });
  }
};
