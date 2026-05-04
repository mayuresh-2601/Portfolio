import express from "express";

import {
  createMessage,
  fetchMessages
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

/*
========================================
MESSAGE ROUTES
========================================
*/

const router = express.Router();

/*
========================================
SEND MESSAGE (PUBLIC)
POST /api/messages
========================================
*/

router.post("/", createMessage);

/*
========================================
GET MESSAGES (ADMIN)
GET /api/messages
========================================
*/

router.get("/", protect, fetchMessages);

/*
========================================
EXPORT
========================================
*/

export default router;