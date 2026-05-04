/* eslint-disable no-unused-vars */
import express from "express";
import multer from "multer";
import path from "path";

import {
  createMessage,
  fetchMessages
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
========================================
MULTER CONFIG (FOR FILE UPLOAD)
========================================
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/*
========================================
SEND MESSAGE (PUBLIC)
POST /api/messages
========================================
*/

router.post("/", upload.single("resume"), createMessage);

/*
========================================
GET MESSAGES (ADMIN)
GET /api/messages
========================================
*/

router.get("/", protect, fetchMessages);

export default router;