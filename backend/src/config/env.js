import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mistry",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  lovableApiKey: process.env.LOVABLE_API_KEY || "",
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: (process.env.SMTP_USER || "").trim(),
    // Gmail app passwords are often pasted with spaces — strip them
    pass: (process.env.SMTP_PASS || "").replace(/\s/g, "").replace(/^["']|["']$/g, ""),
    from: (process.env.SMTP_FROM || process.env.SMTP_USER || "Mistry Service Center").trim(),
    adminNotifyEmail: (process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER || "harshpathak657@gmail.com").trim(),
  },
};

export function assertEnv() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required in backend/.env");
  }
}
