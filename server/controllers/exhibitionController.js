import { Exhibition } from "../models/exhibition.js";

// GET all exhibitions
export const getAllExhibitions = async (req, res) => {
  try {
    const data = await Exhibition.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exhibitions", error: err.message });
  }
};

// POST new exhibition
export const createExhibition = async (req, res) => {
  try {
    const newEntry = await Exhibition.create(req.body);
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ message: "Creation failed", error: err.message });
  }
};

// PUT update exhibition
export const updateExhibition = async (req, res) => {
  try {
    const updated = await Exhibition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Exhibition not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// DELETE exhibition
export const deleteExhibition = async (req, res) => {
  try {
    const deleted = await Exhibition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed", error: err.message });
  }
};
