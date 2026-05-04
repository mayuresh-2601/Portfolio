/* eslint-disable no-undef */
import fs from "fs";
import path from "path";

import {
  getCertificates,
  addCertificate,
  deleteCertificate,
  getCertificateById
} from "../models/certificateModel.js";

/*
========================================
FIX PATH FOR RENDER
========================================
*/

const uploadsPath = path.join(process.cwd(), "backend", "uploads");

/*
========================================
GET ALL CERTIFICATES
========================================
*/

export const fetchCertificates = async (req, res) => {
  try {
    console.log("fetchCertificates called");

    const certificates = await getCertificates();

    const formattedCertificates = certificates.map((cert) => {
      if (cert.image && !cert.image.startsWith("/uploads")) {
        cert.image = `/uploads/${cert.image}`;
      }
      return cert;
    });

    return res.status(200).json(formattedCertificates);

  } catch (error) {
    console.error("Fetch certificates error:", error);

    return res.status(500).json({
      message: error.message || "Failed to fetch certificates"
    });
  }
};

/*
========================================
CREATE CERTIFICATE
========================================
*/

export const createCertificate = async (req, res) => {
  try {
    console.log("createCertificate called");

    const { title, issuer, link } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Certificate title is required"
      });
    }

    let imageFile = null;

    if (req.file) {
      imageFile = req.file.filename; // 🔥 store only filename
    }

    const certificate = {
      title: title.trim(),
      issuer: issuer || "",
      image: imageFile,
      link: link || ""
    };

    const result = await addCertificate(certificate);

    return res.status(201).json({
      success: true,
      message: "Certificate added successfully",
      id: result?.insertId || null
    });

  } catch (error) {
    console.error("Create certificate error:", error);

    return res.status(500).json({
      message: error.message || "Failed to add certificate"
    });
  }
};

/*
========================================
DELETE CERTIFICATE
========================================
*/

export const removeCertificate = async (req, res) => {
  try {
    console.log("removeCertificate called");

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Certificate ID is required"
      });
    }

    let certificate = await getCertificateById(id);

    // 🔥 FIX: handle array result
    if (Array.isArray(certificate)) {
      certificate = certificate[0];
    }

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found"
      });
    }

    /*
    DELETE IMAGE SAFELY
    */

    if (certificate.image) {
      try {
        const filePath = path.join(uploadsPath, certificate.image);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("Deleted image:", certificate.image);
        }
      } catch (err) {
        console.warn("Image delete failed:", err.message);
      }
    }

    await deleteCertificate(id);

    return res.status(200).json({
      success: true,
      message: "Certificate deleted successfully"
    });

  } catch (error) {
    console.error("Delete certificate error:", error);

    return res.status(500).json({
      message: error.message || "Failed to delete certificate"
    });
  }
};