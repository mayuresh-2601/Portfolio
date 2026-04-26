import express from "express";

import {
  register,
  login
} from "../controllers/authController.js";

const router = express.Router();

// ---------------- TEST ROUTE ----------------
// Useful to verify auth routes are working

router.get("/", (req, res) => {
  res.json({
    message: "Auth routes working"
  });
});

// ---------------- REGISTER ----------------
// POST /api/auth/register

router.post(
  "/register",
  register
);

// ---------------- LOGIN ----------------
// POST /api/auth/login

router.post(
  "/login",
  login
);

export default router;