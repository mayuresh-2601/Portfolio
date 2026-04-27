import express from "express";

import {
  fetchSkills,
  createSkill,
  removeSkill
} from "../controllers/skillController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
  SKILL ROUTES
  Base URL:
  /api/skills
*/

/*
  GET ALL SKILLS
  Public route
  GET /api/skills
*/

router.get(
  "/",
  fetchSkills
);

/*
  CREATE SKILL
  Protected route
  POST /api/skills
*/

router.post(
  "/",
  protect,
  createSkill
);

/*
  DELETE SKILL
  Protected route
  DELETE /api/skills/:id
*/

router.delete(
  "/:id",
  protect,
  removeSkill
);

export default router;