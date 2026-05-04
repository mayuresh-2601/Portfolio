/* eslint-disable preserve-caught-error */
import db from "../config/db.js";

/*
========================================
ADD MESSAGE
========================================
*/

export const addMessage = async (message) => {
  try {
    if (
      !message.name ||
      !message.email ||
      !message.message
    ) {
      throw new Error("All fields are required");
    }

    const sql = `
      INSERT INTO messages
      (name, email, message)
      VALUES (?, ?, ?)
    `;

    const values = [
      message.name.trim(),
      message.email.trim(),
      message.message.trim()
    ];

    const [result] = await db.execute(sql, values);

    return result || null;

  } catch (error) {
    console.error("Add Message Error:", error);
    throw new Error(error.message || "Failed to add message");
  }
};

/*
========================================
GET ALL MESSAGES
========================================
*/

export const getMessages = async () => {
  try {
    const sql = `
      SELECT *
      FROM messages
      ORDER BY id DESC
    `;

    const [rows] = await db.execute(sql);

    return rows || [];

  } catch (error) {
    console.error("Get Messages Error:", error);
    throw new Error(error.message || "Failed to fetch messages");
  }
};