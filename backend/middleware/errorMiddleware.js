/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// ---------------- ERROR HANDLER ----------------

export const errorHandler = (
  err,
  req,
  res,
  next
) => {

  // Determine status code

  const statusCode =
    res.statusCode === 200
      ? 500
      : res.statusCode;

  res.status(statusCode);

  // Log error in server

  console.error("Error:", err.message);

  // Send response

  res.json({

    success: false,

    message:
      err.message ||
      "Internal Server Error",

    // Show stack only in development

    stack:
      process.env.NODE_ENV ===
      "production"
        ? null
        : err.stack

  });

};

// ---------------- 404 NOT FOUND ----------------

export const notFound = (
  req,
  res,
  next
) => {

  const error = new Error(
    `Route not found: ${req.originalUrl}`
  );

  res.status(404);

  next(error);

};