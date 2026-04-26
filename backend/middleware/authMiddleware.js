/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

// ---------------- PROTECT ROUTES ----------------

export const protect = (req, res, next) => {

  try {

    let token;

    // Check Authorization header

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      // Extract token

      token =
        req.headers.authorization.split(
          " "
        )[1];

    }

    // If token missing

    if (!token) {

      return res.status(401).json({
        message: "Not authorized, no token"
      });

    }

    // Verify token

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user to request

    req.user = decoded;

    next();

  } catch (error) {

    console.error(error);

    return res.status(401).json({
      message:
        "Not authorized, token failed"
    });

  }

};