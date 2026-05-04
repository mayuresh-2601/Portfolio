/* eslint-disable preserve-caught-error */
import db from "../config/db.js";

export const addMessage = async (data) => {
  try {
    // ✅ SAFE INPUT (prevents undefined crash)
    const name = data?.name?.trim();
    const email = data?.email?.trim();
    const message = data?.message?.trim();

    if (!name || !email || !message) {
      throw new Error("All fields are required");
    }

    const sql = `
      INSERT INTO messages (name, email, message)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name,
      email,
      message
    ]);

    return result;

  } catch (error) {
    console.error("❌ Add Message Error:", error);
    throw new Error(error.message || "Failed to add message");
  }
};

export const getMessages = async () => {
  try {
    const sql = `
      SELECT id, name, email, message
      FROM messages
      ORDER BY id DESC
    `;

    const [rows] = await db.execute(sql);

    return rows;

  } catch (error) {
    console.error("❌ Get Messages Error:", error);
    throw new Error(error.message || "Failed to fetch messages");
  }
};