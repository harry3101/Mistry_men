import nodemailer from "nodemailer";
import { env } from "../config/env.js";

function createTransporter() {
  if (!env.smtp.user || !env.smtp.pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function buildServiceRequestEmail(request) {
  const requestId = String(request._id).slice(-8).toUpperCase();

  const subject = `Mistry Service Request Confirmed — #${requestId}`;
  const text = [
    `Hi ${request.name},`,
    "",
    "Your service request has been registered successfully with Mistry Service Center.",
    "",
    `Request ID: #${requestId}`,
    `Product: ${request.product}`,
    `Issue: ${request.issue}`,
    `Service type: ${request.serviceType}`,
    `Preferred date: ${formatDate(request.preferredDate)}`,
    `Time slot: ${request.timeSlot}`,
    `Address: ${request.address}`,
    `Phone: ${request.phone}`,
    request.notes ? `Notes: ${request.notes}` : "",
    "",
    "Our technician will contact you shortly to confirm the visit.",
    "",
    "Need help? Call +91 95995 66502 or reply to this email.",
    "",
    "— Mistry Service Center",
    "Challehra Gali No-2, Sec-44, Noida, UP",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #2d6a8f); color: #fff; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">Mistry Service Center</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">Your complaint has been registered</p>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <p>Hi <strong>${request.name}</strong>,</p>
        <p>Thank you for registering your service request. Here are your booking details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px 0; color: #666;">Request ID</td><td style="padding: 8px 0;"><strong>#${requestId}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Product</td><td style="padding: 8px 0;">${request.product}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Issue</td><td style="padding: 8px 0;">${request.issue}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Service type</td><td style="padding: 8px 0;">${request.serviceType}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0;">${formatDate(request.preferredDate)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Time slot</td><td style="padding: 8px 0;">${request.timeSlot}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Address</td><td style="padding: 8px 0;">${request.address}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${request.phone}</td></tr>
          ${request.notes ? `<tr><td style="padding: 8px 0; color: #666;">Notes</td><td style="padding: 8px 0;">${request.notes}</td></tr>` : ""}
        </table>
        <p style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 4px;">
          Our technician will contact you shortly to confirm the visit.
        </p>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">
          Need help? Call <a href="tel:+919599566502">+91 95995 66502</a>
        </p>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export function buildAdminNotificationEmail(request) {
  const requestId = String(request._id).slice(-8).toUpperCase();

  const subject = `New Service Request — ${request.name} (#${requestId})`;
  const text = [
    "New customer service request received on Mistry portal.",
    "",
    `Request ID: #${requestId}`,
    `Customer: ${request.name}`,
    `Email: ${request.email}`,
    `Phone: ${request.phone}`,
    `Address: ${request.address}`,
    `Product: ${request.product}`,
    `Issue: ${request.issue}`,
    `Service type: ${request.serviceType}`,
    `Preferred date: ${formatDate(request.preferredDate)}`,
    `Time slot: ${request.timeSlot}`,
    request.notes ? `Notes: ${request.notes}` : "",
    `Status: ${request.status || "pending"}`,
    `Submitted at: ${new Date(request.createdAt || Date.now()).toLocaleString("en-IN")}`,
    "",
    "Please contact the customer to confirm the visit.",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #b45309; color: #fff; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; font-size: 22px;">New Service Request</h1>
        <p style="margin: 8px 0 0; opacity: 0.9;">A customer submitted a complaint on Mistry portal</p>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <p><strong>Request ID:</strong> #${requestId}</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px 0; color: #666;">Customer</td><td style="padding: 8px 0;"><strong>${request.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${request.email}">${request.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${request.phone}">${request.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Address</td><td style="padding: 8px 0;">${request.address}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Product</td><td style="padding: 8px 0;">${request.product}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Issue</td><td style="padding: 8px 0;">${request.issue}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Service type</td><td style="padding: 8px 0;">${request.serviceType}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Date</td><td style="padding: 8px 0;">${formatDate(request.preferredDate)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Time slot</td><td style="padding: 8px 0;">${request.timeSlot}</td></tr>
          ${request.notes ? `<tr><td style="padding: 8px 0; color: #666;">Notes</td><td style="padding: 8px 0;">${request.notes}</td></tr>` : ""}
        </table>
        <p style="background: #fff7ed; border-left: 4px solid #f97316; padding: 12px 16px; border-radius: 4px;">
          Contact the customer to confirm the visit.
        </p>
      </div>
    </div>
  `;

  return { subject, text, html };
}

export async function verifySmtpConnection() {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("SMTP not configured: set SMTP_USER and SMTP_PASS in backend/.env");
    return false;
  }

  try {
    await transporter.verify();
    console.log(`SMTP ready: ${env.smtp.user}`);
    return true;
  } catch (err) {
    console.error("SMTP verification failed:", err.message);
    return false;
  }
}

export async function sendServiceRequestConfirmation(request) {
  const transporter = createTransporter();
  if (!transporter) {
    throw new Error("SMTP not configured. Set SMTP_USER and SMTP_PASS in backend/.env");
  }

  const customerEmail = buildServiceRequestEmail(request);
  const adminEmail = buildAdminNotificationEmail(request);

  const [customerInfo, adminInfo] = await Promise.all([
    transporter.sendMail({
      from: env.smtp.from,
      to: request.email,
      replyTo: env.smtp.user,
      subject: customerEmail.subject,
      text: customerEmail.text,
      html: customerEmail.html,
    }),
    transporter.sendMail({
      from: env.smtp.from,
      to: env.smtp.adminNotifyEmail,
      replyTo: request.email,
      subject: adminEmail.subject,
      text: adminEmail.text,
      html: adminEmail.html,
    }),
  ]);

  console.log(`Confirmation email sent to customer: ${request.email} (${customerInfo.messageId})`);
  console.log(`Admin notification sent to: ${env.smtp.adminNotifyEmail} (${adminInfo.messageId})`);
  return true;
}
