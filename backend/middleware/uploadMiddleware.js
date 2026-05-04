/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(process.cwd(), "backend", "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads folder created at:", uploadPath);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    try {
      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname);

      console.log("Saving file as:", uniqueName);

      cb(null, uniqueName);
    } catch (err) {
      console.error("Filename error:", err);
      cb(err);
    }
  }
});

const fileFilter = (req, file, cb) => {
  try {
    console.log("File received:", file.originalname);
    console.log("MIME type:", file.mimetype);

    // Allow images
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    // Allow PDF
    if (file.mimetype === "application/pdf") {
      return cb(null, true);
    }

    return cb(new Error("Only image or PDF allowed"), false);

  } catch (err) {
    console.error("File filter error:", err);
    cb(err);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});


export const uploadSingle = (fieldName) => (req, res, next) => {
  const handler = upload.single(fieldName);

  handler(req, res, function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Upload failed"
      });
    }
    next();
  });
};

export default upload;