import express from "express";

import {
  fetchProjects,
  createProject,
  removeProject,
  updateProjectById
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ================= PUBLIC =================

// Get all projects
router.get("/", fetchProjects);


// ================= PROTECTED =================

// Create project (with image upload)
router.post(
  "/",
  protect,
  uploadSingle("image"), // 🔥 multer-cloudinary handles upload
  createProject
);

// Update project (optional image update)
router.put(
  "/:id",
  protect,
  uploadSingle("image"),
  updateProjectById
);

// Delete project
router.delete(
  "/:id",
  protect,
  removeProject
);

export default router;