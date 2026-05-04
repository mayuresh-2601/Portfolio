/* eslint-disable no-unused-vars */
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  createMessage,
  fetchMessages
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const uploadPath = "backend/uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});


const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, DOCX, JPG, PNG allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

router.post(
  "/",
  (req, res, next) => {
    upload.single("file")(req, res, function (err) {
      if (err) {
        console.error("UPLOAD ERROR:", err.message);
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  createMessage
);

router.get("/", protect, fetchMessages);

export default router;