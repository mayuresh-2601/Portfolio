import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// TEST ROUTE
router.get("/", (req, res) => {
  res.json({ message: "Auth routes working" });
});

// REGISTER → /api/auth/register
router.post("/register", register);

// LOGIN → /api/auth/login
router.post("/login", login);

export default router;