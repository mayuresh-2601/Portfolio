/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";

/* DATABASE */
import db from "./config/db.js";

/* ROUTES */
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

/* MIDDLEWARE */
import {
  errorHandler,
  notFound
} from "./middleware/errorMiddleware.js";

/*
========================================
CONFIG
========================================
*/

dotenv.config();

const app = express();

/*
========================================
PATH RESOLVE
========================================
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
========================================
CREATE UPLOADS FOLDER
========================================
*/

const uploadsPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Uploads folder created");
}

/*
========================================
SECURITY
========================================
*/

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
  })
);

/*
========================================
LOGGING
========================================
*/

app.use(morgan("dev"));

/*
========================================
CORS
========================================
*/

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

/*
========================================
BODY PARSER
========================================
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
========================================
STATIC UPLOADS
========================================
*/

app.use("/uploads", express.static(uploadsPath));

/*
========================================
TEST ROUTE
========================================
*/

app.get("/api/test", (req, res) => {
  res.json({ message: "API WORKING ✅" });
});

/*
========================================
API ROUTES
========================================
*/

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/certificates", certificateRoutes);

/*
========================================
SERVE FRONTEND
========================================
*/

const frontendPath = path.join(__dirname, "../dist");

app.use(express.static(frontendPath));

/*
🔥 FIXED ROUTING (NO "*")
*/

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(frontendPath, "index.html"));
});

/*
========================================
ERROR HANDLING
========================================
*/

app.use(notFound);

app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

/*
========================================
SERVER START
========================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`Uploads path: ${uploadsPath}`);
  console.log("================================");
});