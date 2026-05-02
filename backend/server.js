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
RESOLVE DIRECTORY
========================================
*/

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

/*
========================================
CREATE UPLOADS FOLDER
========================================
*/

const uploadsPath =
  path.join(
    __dirname,
    "uploads"
  );

if (!fs.existsSync(uploadsPath)) {

  fs.mkdirSync(
    uploadsPath,
    { recursive: true }
  );

  console.log(
    "Uploads folder created"
  );

}

/*
========================================
SECURITY (FIXED)
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
CORS (FIXED)
========================================
*/

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

/*
========================================
BODY PARSER
========================================
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

/*
========================================
STATIC UPLOAD FOLDER
========================================
*/

app.use(
  "/uploads",
  express.static(
    uploadsPath
  )
);

/*
========================================
ROOT ROUTE
========================================
*/

app.get(
  "/",
  (req, res) => {

    res.json({
      message:
        "Backend server is running"
    });

  }
);

/*
========================================
API ROUTES
========================================
*/

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/skills",
  skillRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/certificates",
  certificateRoutes
);

/*
========================================
MULTER ERROR HANDLER
========================================
*/

app.use(
  (err, req, res, next) => {

    if (err.name === "MulterError") {

      console.error(
        "Multer error:",
        err
      );

      if (
        err.code ===
        "LIMIT_FILE_SIZE"
      ) {

        return res.status(400).json({
          message:
            "File size must be less than 10MB"
        });

      }

      return res.status(400).json({
        message:
          err.message
      });

    }

    if (
      err.message ===
      "Only image files or PDF allowed"
    ) {

      return res.status(400).json({
        message:
          err.message
      });

    }

    next(err);

  }
);

/*
========================================
404 + GLOBAL ERROR
========================================
*/

app.use(notFound);

app.use(errorHandler);

/*
========================================
SERVER START
========================================
*/

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      "================================"
    );

    console.log(
      `Server running on port ${PORT}`
    );

    console.log(
      `Uploads path: ${uploadsPath}`
    );

    console.log(
      "================================"
    );

  }
); 