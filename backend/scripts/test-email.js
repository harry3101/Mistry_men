import dotenv from "dotenv";
import { env } from "../src/config/env.js";
import { verifySmtpConnection, sendServiceRequestConfirmation } from "../src/services/email.service.js";

dotenv.config();

const testEmail = process.argv[2] || env.smtp.user;

async function main() {
  console.log("Testing SMTP for:", env.smtp.user);
  const ok = await verifySmtpConnection();
  if (!ok) {
    process.exit(1);
  }

  await sendServiceRequestConfirmation({
    _id: "000000000000000000000001",
    name: "Test User",
    email: testEmail,
    phone: "+91 9599566502",
    address: "Challehra Gali No-2, Sec-44, Noida, UP",
    product: "Geyser",
    issue: "No hot water",
    serviceType: "Repair",
    preferredDate: new Date(),
    timeSlot: "09:00 – 11:00",
    notes: "SMTP test email from Mistry backend",
  });

  console.log("Test email sent successfully to:", testEmail);
}

main().catch((err) => {
  console.error("Test failed:", err.message);
  process.exit(1);
});
