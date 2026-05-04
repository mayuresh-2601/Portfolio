import express from "express";

import {
  fetchProjects,
  createProject,
  removeProject,
  updateProjectById
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";

/*
========================================
PROJECT ROUTES
========================================
*/

const router = express.Router();

/*
========================================
GET ALL PROJECTS (PUBLIC)
GET /api/projects
========================================
*/

router.get("/", fetchProjects);

/*
========================================
CREATE PROJECT (PROTECTED)
POST /api/projects
========================================
*/

router.post(
  "/",
  protect,
  uploadSingle("image"), // 🔥 SAFE upload handler
  createProject
);

/*
========================================
UPDATE PROJECT (PROTECTED)
PUT /api/projects/:id
========================================
*/

router.put(
  "/:id",
  protect,
  uploadSingle("image"), // 🔥 SAFE upload handler
  updateProjectById
);

/*
========================================
DELETE PROJECT (PROTECTED)
DELETE /api/projects/:id
========================================
*/

router.delete(
  "/:id",
  protect,
  removeProject
);

/*
========================================
EXPORT
========================================
*/

export default router;