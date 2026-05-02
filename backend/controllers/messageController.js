import {
  addMessage,
  getMessages
} from "../models/messageModel.js";

import sendEmail from "../utils/sendEmail.js";

export const createMessage =
  async (req, res) => {

    try {

      console.log(
        "createMessage called"
      );

      const {
        name,
        email,
        message
      } = req.body;

      if (
        !name ||
        !email ||
        !message
      ) {

        return res.status(400)
          .json({
            message:
              "All fields required"
          });

      }

      const fileName =
        req.file
          ? req.file.filename
          : null;

      await addMessage({

        name,
        email,
        message,
        file: fileName

      });

      console.log(
        "Saved to database"
      );

      await sendEmail({

        name,
        email,
        message,
        file: fileName

      });

      console.log(
        "Email function finished"
      );

      res.status(201).json({

        message:
          "Message sent successfully"

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Failed to send message"

      });

    }

  };

export const fetchMessages =
  async (req, res) => {

    try {

      const messages =
        await getMessages();

      res.status(200)
        .json(messages);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        message:
          "Failed to fetch messages"

      });

    }

  };