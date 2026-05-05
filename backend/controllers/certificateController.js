import {
  getCertificates,
  addCertificate,
  deleteCertificate,
  getCertificateById
} from "../models/certificateModel.js";

export const fetchCertificates = async (req, res) => {
  try {
    const certificates = await getCertificates();
    return res.status(200).json(certificates);
  } catch (error) {
    console.error("Fetch certificates error:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch certificates"
    });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const { title, issuer, link } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Certificate title is required"
      });
    }

    const certificate = {
      title: title.trim(),
      issuer: issuer || "",
      image: req.file ? req.file.path : null, 
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

export const removeCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    let certificate = await getCertificateById(id);
    if (Array.isArray(certificate)) {
      certificate = certificate[0];
    }

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found"
      });
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