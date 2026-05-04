/* eslint-disable no-undef */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/*
========================================
LOGIN (ENV BASED ADMIN)
========================================
*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    // ✅ CHECK ADMIN EMAIL
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        message: "Invalid email"
      });
    }

    // ✅ COMPARE PASSWORD WITH HASH IN ENV
    const isMatch = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // ✅ GENERATE TOKEN
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};