/* eslint-disable no-undef */
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// ---------------- Validate Environment Variables ----------------

const requiredEnv = [
  "DB_HOST",
  "DB_USER",
  "DB_NAME"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(
      `Missing environment variable: ${key}`
    );
    process.exit(1);
  }
});

// ---------------- Create Connection Pool ----------------

const db = mysql.createPool({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password:
    process.env.DB_PASSWORD || "",

  database: process.env.DB_NAME,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0

});

// ---------------- Test Connection ----------------

const testConnection = async () => {

  try {

    const connection =
      await db.getConnection();

    console.log(
      "MySQL Connected Successfully"
    );

    connection.release();

  } catch (error) {

    console.error(
      "Database connection failed:",
      error.message
    );

    process.exit(1);

  }

};

testConnection();

// ---------------- Export ----------------

export default db;