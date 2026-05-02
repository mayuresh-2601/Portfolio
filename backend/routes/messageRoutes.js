import express from "express";

import {
  createMessage,
  fetchMessages
} from "../controllers/messageController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

/*
  SEND MESSAGE
  PUBLIC
*/

router.post(
  "/",
  upload.single("file"),
  createMessage
);

/*
  GET MESSAGES
  ADMIN
*/

router.get(
  "/",
  protect,
  fetchMessages
);

export default router;