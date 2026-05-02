import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/*
========================================
RESOLVE DIRECTORY
========================================
*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(
  __dirname,
  "..",
  "uploads"
);

/*
========================================
CREATE UPLOADS FOLDER IF MISSING
========================================
*/

if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, {
    recursive: true
  });

  console.log(
    "Uploads folder created"
  );

}

/*
========================================
STORAGE CONFIG
========================================
*/

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadPath);

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

    console.log(
      "Saving file as:",
      uniqueName
    );

    cb(null, uniqueName);

  }

});

/*
========================================
FILE FILTER
========================================
*/

const fileFilter = (
  req,
  file,
  cb
) => {

  console.log(
    "File received:",
    file.originalname
  );

  console.log(
    "MIME type:",
    file.mimetype
  );

  /*
  Allow any image
  */

  if (
    file.mimetype.startsWith(
      "image/"
    )
  ) {

    return cb(null, true);

  }

  /*
  Allow PDF
  */

  if (
    file.mimetype ===
    "application/pdf"
  ) {

    return cb(null, true);

  }

  /*
  Reject other types
  */

  return cb(
    new Error(
      "Only image files or PDF allowed"
    ),
    false
  );

};

/*
========================================
MULTER CONFIG
========================================
*/

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      10 * 1024 * 1024

  }

});

/*
========================================
EXPORT
========================================
*/

export default upload;