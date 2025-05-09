import express from "express";
import {
  getAllExhibitions,
  createExhibition,
  updateExhibition,
  deleteExhibition,
} from "../controllers/exhibitionController.js";

const router = express.Router();

router.get("/", getAllExhibitions);
router.post("/", createExhibition);
router.put("/:id", updateExhibition);
router.delete("/:id", deleteExhibition);

export default router;
