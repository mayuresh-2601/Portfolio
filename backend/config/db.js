/* eslint-disable no-undef */
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// ---------------- Validate Environment Variables ----------------

const requiredEnv = [
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
  "DB_PORT"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
});

// ---------------- Create Connection Pool ----------------

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), // FIX: ensure number

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ---------------- Test Connection ----------------

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL Connected Successfully");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
})();

// ---------------- Export ----------------

export default db;