import express from "express";

import {
  fetchSkills,
  createSkill,
  removeSkill
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------------- GET ALL SKILLS ----------------
// Public route

router.get(
  "/",
  fetchSkills
);

// ---------------- CREATE SKILL ----------------
// Protected route

router.post(
  "/",
  protect,
  createSkill
);

// ---------------- DELETE SKILL ----------------
// Protected route

router.delete(
  "/:id",
  protect,
  removeSkill
);

export default router;