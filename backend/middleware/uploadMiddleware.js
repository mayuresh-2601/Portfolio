/* eslint-disable no-unused-vars */
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ✅ Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "portfolio/projects", // better structured
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
  }),
});

// ✅ multer config
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ✅ error-safe wrapper
export const uploadSingle = (fieldName) => (req, res, next) => {
  const handler = upload.single(fieldName);

  handler(req, res, (err) => {
    if (err) {
      console.error("Upload error:", err);

      return res.status(500).json({
        success: false,
        message: err.message || "Upload failed",
      });
    }

    next();
  });
};

export default upload;