import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import careerRoutes from "./routes/career.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import healthRoutes from "./routes/health.routes.js";
import serviceRequestRoutes from "./routes/serviceRequest.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: [env.frontendUrl, "http://localhost:5173", "http://localhost:8080"],
      credentials: true,
    }),
  );
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.json({ success: true, name: "Mistry Backend API", version: "1.0.0" });
  });

  app.use("/api/health", healthRoutes);
  app.use("/api/service-requests", serviceRequestRoutes);
  app.use("/api/career-applications", careerRoutes);
  app.use("/api/chat", chatRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
