/* eslint-disable no-undef */
import nodemailer from "nodemailer";

const sendEmail = async (messageData) => {
  console.log("sendEmail function called");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,

      subject: `New Message from ${messageData.name}`,

      text: `
Name: ${messageData.name}
Email: ${messageData.email}
Message: ${messageData.message}
      `,

      replyTo: messageData.email,

      // ✅ FIXED ATTACHMENT
      attachments: messageData.file
        ? [
            {
              filename: messageData.file.originalname, // correct name
              path: messageData.file.path // correct full path
            }
          ]
        : []
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent with attachment");

  } catch (error) {
    console.error("❌ Email error:", error);
  }
};

export default sendEmail;