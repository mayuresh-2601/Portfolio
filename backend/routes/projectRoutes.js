import express from "express";

import {
  fetchProjects,
  createProject,
  removeProject
} from "../controllers/projectController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/*
  PROJECT ROUTES
  Base URL:
  /api/projects
*/

/*
  GET ALL PROJECTS
  Public route
  GET /api/projects
*/

router.get(
  "/",
  fetchProjects
);

/*
  CREATE PROJECT
  Protected route
  Handles image upload
  POST /api/projects
*/

router.post(
  "/",
  protect,
  upload.single("image"),
  createProject
);

/*
  DELETE PROJECT
  Protected route
  DELETE /api/projects/:id
*/

router.delete(
  "/:id",
  protect,
  removeProject
);

export default router;