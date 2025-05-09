import express from "express";
import {
  getCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  participateInCompetition,
} from "../controllers/competitionController.js";

const router = express.Router();

router.get("/", getCompetitions);
router.post("/", createCompetition);
router.put("/:id", updateCompetition);
router.delete("/:id", deleteCompetition);
router.post("/:id/participate", participateInCompetition);

export default router;