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

/*
========================================
GET ALL PROJECTS
Public
GET /api/projects
========================================
*/

router.get(
  "/",
  fetchProjects
);

/*
========================================
CREATE PROJECT
Protected
POST /api/projects
Handles image upload
========================================
*/

router.post(
  "/",
  protect,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {

      // Multer error (file too large etc.)
      if (err) {

        console.error("Upload error:", err);

        // File size error
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message:
              "File size must be less than 10MB"
          });
        }

        // Invalid file type
        return res.status(400).json({
          message:
            err.message ||
            "File upload failed"
        });

      }

      next();
    });
  },
  createProject
);

/*
========================================
UPDATE PROJECT
Protected
PUT /api/projects/:id
Handles image upload
========================================
*/

router.put(
  "/:id",
  protect,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {

      if (err) {

        console.error("Upload error:", err);

        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message:
              "File size must be less than 10MB"
          });
        }

        return res.status(400).json({
          message:
            err.message ||
            "File upload failed"
        });

      }

      next();
    });
  },
  updateProjectById
);

/*
========================================
DELETE PROJECT
Protected
DELETE /api/projects/:id
========================================
*/

router.delete(
  "/:id",
  protect,
  removeProject
);

export default router;