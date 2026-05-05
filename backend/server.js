/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// ✅ Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================= SECURITY =================
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },

    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com",
          "https://*.cloudinary.com",
        ],

        // ✅ FIX: allow API calls
        connectSrc: [
          "'self'",
          "http://localhost:5000",
          "https://mayuresh-portfolio-frt6.onrender.com",
        ],

        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
// ================= MIDDLEWARE =================
app.use(morgan("dev"));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/api/test", (req, res) => {
  res.json({ message: "API WORKING ✅" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/certificates", certificateRoutes);

// ================= FRONTEND =================
const frontendPath = path.join(__dirname, "../dist");

if (process.env.NODE_ENV === "production" && frontendPath) {
  app.use(express.static(frontendPath));

  app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }

    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ================= ERROR =================
app.use(notFound);
app.use(errorHandler);

// ================= START =================
const startServer = async () => {
  try {
    await db.execute("SELECT 1");
    console.log("✅ MySQL Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1);
  }
};

startServer();