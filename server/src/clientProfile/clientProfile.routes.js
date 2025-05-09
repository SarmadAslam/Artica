import express from "express";
// import { createProfile, getAllProfiles } from "../controllers/clientProfile.controller.js";
import { createProfile, getAllProfiles } from "./clientProfile.controller.js";
const router = express.Router();

//new
import ClientProfile from "./clientProfile.model.js";


// POST /api/profiles
router.post("/create-profile", createProfile);

// GET /api/profiles (optional, for viewing all)
router.get("/", getAllProfiles);

//new
router.get("/:userId", async (req, res) => {
    try {
      const profile = await ClientProfile.findOne({ userId: req.params.userId });
      if (!profile) return res.status(404).json({ message: "Profile not found" });
      res.json(profile);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
export default router;
