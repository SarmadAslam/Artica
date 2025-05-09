import { Competition } from "../models/competition.js";

// GET all competitions
export const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find().sort({ createdAt: -1 });
    res.status(200).json(competitions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch competitions" });
  }
};

// POST create competition
export const createCompetition = async (req, res) => {
  try {
    const newCompetition = new Competition(req.body);
    await newCompetition.save();
    res.status(201).json(newCompetition);
  } catch (err) {
    res.status(400).json({ message: "Failed to create competition", error: err.message });
  }
};

// PUT update competition
export const updateCompetition = async (req, res) => {
  try {
    const updated = await Competition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Competition not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update competition", error: err.message });
  }
};

// DELETE competition
export const deleteCompetition = async (req, res) => {
  try {
    const deleted = await Competition.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete competition", error: err.message });
  }
};

export const participateInCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Competition.findByIdAndUpdate(
      id,
      { $inc: { participationCount: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Competition not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Participation failed", error: err.message });
  }
};