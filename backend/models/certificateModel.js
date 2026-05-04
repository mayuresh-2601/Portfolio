/* eslint-disable preserve-caught-error */
import db from "../config/db.js";
export const getCertificates = async () => {
  try {
    const query = `
      SELECT *
      FROM certificates
      ORDER BY id DESC
    `;

    const [rows] = await db.execute(query);

    return rows || [];

  } catch (error) {
    console.error("Get Certificates Error:", error);
    throw new Error(error.message || "Failed to fetch certificates");
  }
};

export const getCertificateById = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return null;
    }

    const query =
      "SELECT * FROM certificates WHERE id = ?";

    const [rows] = await db.execute(query, [id]);

    return rows && rows.length ? rows[0] : null;

  } catch (error) {
    console.error("Get Certificate By ID Error:", error);
    throw new Error(error.message || "Failed to get certificate");
  }
};

export const addCertificate = async (certificate) => {
  try {
    const query = `
      INSERT INTO certificates
      (
        title,
        issuer,
        image,
        link
      )
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      certificate.title || "",
      certificate.issuer || "",
      certificate.image || null,
      certificate.link || ""
    ];

    const [result] = await db.execute(query, values);

    return result || null;

  } catch (error) {
    console.error("Add Certificate Error:", error);
    throw new Error(error.message || "Failed to add certificate");
  }
};

export const deleteCertificate = async (id) => {
  try {
    if (!id || isNaN(id)) {
      return null;
    }

    const query =
      "DELETE FROM certificates WHERE id = ?";

    const [result] = await db.execute(query, [id]);

    return result || null;

  } catch (error) {
    console.error("Delete Certificate Error:", error);
    throw new Error(error.message || "Failed to delete certificate");
  }
};