import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  getCertificates,
  addCertificate,
  deleteCertificate,
  getCertificateById
} from "../models/certificateModel.js";

/*
========================================
RESOLVE DIRECTORY
========================================
*/

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const uploadsPath =
  path.join(
    __dirname,
    "..",
    "uploads"
  );

/*
========================================
GET CERTIFICATES
========================================
*/

export const fetchCertificates = async (
  req,
  res
) => {

  try {

    console.log(
      "fetchCertificates called"
    );

    const certificates =
      await getCertificates();

    const formattedCertificates =
      certificates.map(
        (cert) => {

          if (
            cert.image &&
            !cert.image.startsWith(
              "/uploads"
            )
          ) {

            cert.image =
              `/uploads/${cert.image}`;

          }

          return cert;

        }
      );

    return res
      .status(200)
      .json(
        formattedCertificates
      );

  } catch (error) {

    console.error(
      "Fetch certificates error:",
      error
    );

    return res
      .status(500)
      .json({
        message:
          "Failed to fetch certificates"
      });

  }

};

/*
========================================
CREATE CERTIFICATE
========================================
*/

export const createCertificate = async (
  req,
  res
) => {

  try {

    console.log(
      "createCertificate called"
    );

    const {
      title,
      issuer,
      link
    } = req.body;

    if (
      !title ||
      !title.trim()
    ) {

      return res
        .status(400)
        .json({
          message:
            "Certificate title is required"
        });

    }

    let imageFile = null;

    if (req.file) {

      imageFile =
        `/uploads/${req.file.filename}`;

    }

    const certificate = {

      title:
        title.trim(),

      issuer:
        issuer || "",

      image:
        imageFile,

      link:
        link || ""

    };

    const result =
      await addCertificate(
        certificate
      );

    console.log(
      "Certificate saved:",
      result.insertId
    );

    return res
      .status(201)
      .json({

        message:
          "Certificate added successfully",

        id:
          result.insertId

      });

  } catch (error) {

    console.error(
      "Create certificate error:",
      error
    );

    return res
      .status(500)
      .json({
        message:
          "Failed to add certificate"
      });

  }

};

/*
========================================
DELETE CERTIFICATE + IMAGE
========================================
*/

export const removeCertificate = async (
  req,
  res
) => {

  try {

    console.log(
      "removeCertificate called"
    );

    const { id } =
      req.params;

    if (!id) {

      return res
        .status(400)
        .json({
          message:
            "Certificate ID is required"
        });

    }

    /*
    Get certificate first
    */

    const certificate =
      await getCertificateById(
        id
      );

    if (!certificate) {

      return res
        .status(404)
        .json({
          message:
            "Certificate not found"
        });

    }

    /*
    Delete image file
    */

    if (certificate.image) {

      const filename =
        certificate.image.replace(
          "/uploads/",
          ""
        );

      const filePath =
        path.join(
          uploadsPath,
          filename
        );

      if (
        fs.existsSync(filePath)
      ) {

        fs.unlinkSync(filePath);

        console.log(
          "Deleted image:",
          filename
        );

      } else {

        console.log(
          "Image file not found:",
          filename
        );

      }

    }

    /*
    Delete DB record
    */

    await deleteCertificate(id);

    console.log(
      "Certificate deleted:",
      id
    );

    return res
      .status(200)
      .json({

        message:
          "Certificate deleted successfully"

      });

  } catch (error) {

    console.error(
      "Delete certificate error:",
      error
    );

    return res
      .status(500)
      .json({
        message:
          "Failed to delete certificate"
      });

  }

};