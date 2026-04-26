/* eslint-disable no-undef */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  findUserByEmail,
  createUser
} from "../models/userModel.js";

// ---------------- REGISTER ----------------

export const register = async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    const existingUser =
      await findUserByEmail(email);

    if (existingUser.length > 0) {

      return res.status(409).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      bcrypt.hashSync(password, 10);

    await createUser({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message:
        "User registered successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });

  }

};

// ---------------- LOGIN ----------------

export const login = async (req, res) => {

  try {

    const { email, password } =
      req.body;

    if (!email || !password) {

      return res.status(400).json({
        message:
          "Email and password required"
      });

    }

    if (!process.env.JWT_SECRET) {

      return res.status(500).json({
        message:
          "JWT secret missing"
      });

    }

    const users =
      await findUserByEmail(email);

    if (users.length === 0) {

      return res.status(401).json({
        message: "User not found"
      });

    }

    const user = users[0];

    const isMatch =
      bcrypt.compareSync(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        message:
          "Invalid password"
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};