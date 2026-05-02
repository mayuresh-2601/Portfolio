import db from "../config/db.js";

/*
========================================
GET ALL CERTIFICATES
========================================
*/

export const getCertificates = async () => {

  try {

    const query = `
      SELECT *
      FROM certificates
      ORDER BY id DESC
    `;

    const [rows] =
      await db.execute(query);

    return rows;

  } catch (error) {

    console.error(
      "Get Certificates Error:",
      error
    );

    throw error;

  }

};

/*
========================================
GET CERTIFICATE BY ID
(Required to delete image file)
========================================
*/

export const getCertificateById = async (id) => {

  try {

    const query =
      "SELECT * FROM certificates WHERE id = ?";

    const [rows] =
      await db.execute(
        query,
        [id]
      );

    return rows[0];

  } catch (error) {

    console.error(
      "Get Certificate By ID Error:",
      error
    );

    throw error;

  }

};

/*
========================================
ADD CERTIFICATE
========================================
*/

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

    const [result] =
      await db.execute(
        query,
        values
      );

    return result;

  } catch (error) {

    console.error(
      "Add Certificate Error:",
      error
    );

    throw error;

  }

};

/*
========================================
DELETE CERTIFICATE
========================================
*/

export const deleteCertificate = async (id) => {

  try {

    const query =
      "DELETE FROM certificates WHERE id = ?";

    const [result] =
      await db.execute(
        query,
        [id]
      );

    return result;

  } catch (error) {

    console.error(
      "Delete Certificate Error:",
      error
    );

    throw error;

  }

};