import express from "express";

import {
  fetchSkills,
  createSkill,
  removeSkill
} from "../controllers/skillController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

/*
  SKILL ROUTES
  Base URL:
  /api/skills
*/

const router =
  express.Router();

/* ---------------- GET ALL SKILLS ---------------- */
/*
  Public route
  GET /api/skills
*/

router.get(
  "/",
  fetchSkills
);

/* ---------------- CREATE SKILL ---------------- */
/*
  Protected route
  POST /api/skills
*/

router.post(
  "/",
  protect,
  createSkill
);

/* ---------------- DELETE SKILL ---------------- */
/*
  Protected route
  DELETE /api/skills/:id
*/

router.delete(
  "/:id",
  protect,
  removeSkill
);

/* ---------------- EXPORT ROUTER ---------------- */

export default router;