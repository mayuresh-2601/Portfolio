/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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

/*
  Resolve directory path
*/

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

/*
  CORS
*/

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

/*
  Body Parser
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

/*
  Static Upload Folder
*/

const uploadsPath =
  path.join(
    __dirname,
    "uploads"
  );

app.use(
  "/uploads",
  express.static(
    uploadsPath
  )
);

/*
  Root Test Route
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
  API Routes
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

/*
  Error Handling Middleware
*/

app.use(notFound);

app.use(errorHandler);

/*
  Server Start
*/

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);