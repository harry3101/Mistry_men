import { assertEnv, env } from "./config/env.js";
import { connectDatabase } from "./config/db.js";
import { createApp } from "./app.js";
import { verifySmtpConnection } from "./services/email.service.js";

async function start() {
  assertEnv();
  await connectDatabase();
  await verifySmtpConnection();

  const app = createApp();

  app.listen(env.port, "0.0.0.0", () => {
    console.log(`Mistry backend running on port ${env.port}`);
    console.log(`CORS allowed for: ${env.frontendUrl}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err.message);
  process.exit(1);
});
