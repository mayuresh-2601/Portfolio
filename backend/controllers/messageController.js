import {
  addMessage,
  getMessages
} from "../models/messageModel.js";

import sendEmail from "../utils/sendEmail.js";

/*
========================================
CREATE MESSAGE
========================================
*/

export const createMessage = async (req, res) => {
  try {
    console.log("📩 createMessage called");

    const name = req.body?.name;
    const email = req.body?.email;
    const message = req.body?.message;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    /*
    VALIDATION
    */

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    /*
    SAVE MESSAGE
    */

    await addMessage({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    console.log("✅ Saved to database");

    /*
    SEND EMAIL WITH FILE
    */

    try {
      await sendEmail({
        name,
        email,
        message,
        file: req.file // 🔥 THIS WAS MISSING
      });

      console.log("✅ Email sent with attachment");

    } catch (emailError) {
      console.warn("⚠ Email failed:", emailError.message);
    }

    /*
    SUCCESS
    */

    return res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("❌ Create message error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to send message"
    });
  }
};

/*
========================================
GET ALL MESSAGES
========================================
*/

export const fetchMessages = async (req, res) => {
  try {
    const messages = await getMessages();

    return res.status(200).json(messages || []);

  } catch (error) {
    console.error("❌ Fetch messages error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch messages"
    });
  }
};