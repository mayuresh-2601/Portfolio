import express from "express";

import {
  fetchCertificates,
  createCertificate,
  removeCertificate
} from "../controllers/certificateController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

/*
  CERTIFICATE ROUTES
  Base URL:
  /api/certificates
*/

const router = express.Router();

/* ======================================================
   GET ALL CERTIFICATES
   Public route
   GET /api/certificates
====================================================== */

router.get(
  "/",
  fetchCertificates
);

/* ======================================================
   CREATE CERTIFICATE
   Protected route
   POST /api/certificates
   Handles image upload
====================================================== */

router.post(
  "/",
  protect,
  upload.single("image"),
  (req, res, next) => {

    /*
      Safety check:
      If multer throws error
      we catch it here
    */

    try {

      next();

    } catch (error) {

      console.error(
        "Upload error:",
        error
      );

      return res.status(400).json({
        message:
          error.message ||
          "File upload failed"
      });

    }

  },
  createCertificate
);

/* ======================================================
   DELETE CERTIFICATE
   Protected route
   DELETE /api/certificates/:id
====================================================== */

router.delete(
  "/:id",
  protect,
  removeCertificate
);

/* ======================================================
   EXPORT ROUTER
====================================================== */

export default router;