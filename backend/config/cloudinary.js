/* eslint-disable no-undef */
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// ✅ FIX: load .env from root folder
dotenv.config({ path: "../../.env" });

// ✅ Debug (optional - remove later)
console.log("Cloudinary ENV:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY ? "Loaded" : "Missing",
  api_secret: process.env.CLOUD_API_SECRET ? "Loaded" : "Missing",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;