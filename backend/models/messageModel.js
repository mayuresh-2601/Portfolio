import db from "../config/db.js";

// CREATE MESSAGE

export const addMessage = async (message) => {

    const sql = `
    INSERT INTO messages
    (name, email, message)
    VALUES (?, ?, ?)
  `;

    const values = [
        message.name,
        message.email,
        message.message
    ];

    const [result] = await db.query(sql, values);

    return result;

};

// GET ALL MESSAGES

export const getMessages = async () => {

    const sql = `
    SELECT *
    FROM messages
    ORDER BY id DESC
  `;

    const [rows] = await db.query(sql);

    return rows;

};