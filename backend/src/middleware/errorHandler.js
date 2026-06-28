import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (env.nodeEnv !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.nodeEnv !== "production" && err.stack ? { stack: err.stack } : {}),
  });
}
