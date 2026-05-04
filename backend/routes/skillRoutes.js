import express from "express";

import {
  fetchSkills,
  createSkill,
  removeSkill
} from "../controllers/skillController.js";

import { protect } from "../middleware/authMiddleware.js";

/*
========================================
SKILL ROUTES
========================================
*/

const router = express.Router();

/*
========================================
GET ALL SKILLS (PUBLIC)
GET /api/skills
========================================
*/

router.get("/", fetchSkills);

/*
========================================
CREATE SKILL (PROTECTED)
POST /api/skills
========================================
*/

router.post("/", protect, createSkill);

/*
========================================
DELETE SKILL (PROTECTED)
DELETE /api/skills/:id
========================================
*/

router.delete("/:id", protect, removeSkill);

/*
========================================
EXPORT
========================================
*/

export default router;