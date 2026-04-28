import express from "express";

import {
  fetchProjects,
  createProject,
  removeProject,
  updateProjectById
} from "../controllers/projectController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get(
  "/",
  fetchProjects
);


router.post(
  "/",
  protect,
  upload.single("image"),
  createProject
);


router.put(
  "/:id",
  protect,
  upload.single("image"),
  updateProjectById
);


router.delete(
  "/:id",
  protect,
  removeProject
);

export default router;