import express from "express";

import {
  fetchCertificates,
  createCertificate,
  removeCertificate
} from "../controllers/certificateController.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadSingle } from "../middleware/uploadMiddleware.js";

/*
========================================
CERTIFICATE ROUTES
========================================
*/

const router = express.Router();

/*
========================================
GET ALL CERTIFICATES (PUBLIC)
GET /api/certificates
========================================
*/

router.get("/", fetchCertificates);

/*
========================================
CREATE CERTIFICATE (PROTECTED)
POST /api/certificates
========================================
*/

router.post(
  "/",
  protect,
  uploadSingle("image"), // 🔥 SAFE multer handler
  createCertificate
);

/*
========================================
DELETE CERTIFICATE (PROTECTED)
DELETE /api/certificates/:id
========================================
*/

router.delete(
  "/:id",
  protect,
  removeCertificate
);

/*
========================================
EXPORT
========================================
*/

export default router;