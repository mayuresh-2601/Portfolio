import express from "express";

import {
  fetchProjects,
  createProject,
  removeProject
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ---------------- GET ALL PROJECTS ----------------
// Public route

router.get(
  "/",
  fetchProjects
);

// ---------------- CREATE PROJECT ----------------
// Protected + File upload

router.post(
  "/",
  protect,
  upload.single("image"),
  createProject
);

// ---------------- DELETE PROJECT ----------------
// Protected route

router.delete(
  "/:id",
  protect,
  removeProject
);

export default router;