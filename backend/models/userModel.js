import db from "../config/db.js";

// ---------------- FIND USER BY EMAIL ----------------

export const findUserByEmail = async (email) => {

  if (!email) {
    throw new Error("Email is required");
  }

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
  `;

  try {

    const [rows] =
      await db.query(sql, [email]);

    return rows;

  } catch (error) {

    console.error(
      "Error finding user:",
      error
    );

    throw error;

  }

};

// ---------------- CREATE USER ----------------

export const createUser = async (user) => {

  if (
    !user ||
    !user.name ||
    !user.email ||
    !user.password
  ) {
    throw new Error("Invalid user data");
  }

  const sql = `
    INSERT INTO users
    (name, email, password)
    VALUES (?, ?, ?)
  `;

  const values = [
    user.name,
    user.email,
    user.password
  ];

  try {

    const [result] =
      await db.query(sql, values);

    return result;

  } catch (error) {

    console.error(
      "Error creating user:",
      error
    );

    throw error;

  }

};