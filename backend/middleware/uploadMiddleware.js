import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/*
  UPLOAD MIDDLEWARE
  Safe for Windows / Linux / Deployment
*/

// ---------------- Resolve Directory ----------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- Upload Folder Path ----------------

const uploadPath = path.join(
  __dirname,
  "..",
  "uploads"
);

// ---------------- Ensure Upload Folder Exists ----------------

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(
    uploadPath,
    { recursive: true }
  );

  console.log(
    "Uploads folder created"
  );

}

// ---------------- Storage Configuration ----------------

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(
      null,
      uploadPath
    );

  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(
        Math.random() * 1e9
      ) +
      path.extname(
        file.originalname
      );

    cb(
      null,
      uniqueName
    );

  }

});

// ---------------- File Filter ----------------

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [

    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"

  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(
      null,
      true
    );

  } else {

    cb(
      new Error(
        "Only image files (jpeg, png, jpg, webp) are allowed"
      ),
      false
    );

  }

};

// ---------------- Multer Configuration ----------------

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      5 * 1024 * 1024 // 5MB

  }

});

export default upload;