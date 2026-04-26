import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";

import {
  errorHandler,
  notFound
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ---------------- CORS ----------------

app.use(cors());

// ---------------- BODY PARSER ----------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- STATIC FILES ----------------

app.use("/uploads", express.static("uploads"));

// ---------------- ROOT TEST ----------------

app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running"
  });
});

// ---------------- ROUTES ----------------

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/skills", skillRoutes);

// ---------------- ERROR HANDLING ----------------

app.use(notFound);

app.use(errorHandler);

// ---------------- SERVER ----------------

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});