import { ServiceRequest } from "../models/ServiceRequest.js";
import { sendServiceRequestConfirmation } from "../services/email.service.js";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

export async function createServiceRequest(req, res) {
  const {
    name,
    email,
    phone,
    address,
    product,
    issue,
    serviceType,
    preferredDate,
    timeSlot,
    notes,
  } = req.body;

  const request = await ServiceRequest.create({
    name,
    email,
    phone,
    address,
    product,
    issue,
    serviceType,
    preferredDate: new Date(preferredDate),
    timeSlot,
    notes: notes || "",
  });

  let emailSent = false;
  let emailError = null;
  try {
    emailSent = await sendServiceRequestConfirmation(request);
  } catch (err) {
    emailError = err.message;
    console.error("Failed to send confirmation email:", err.message);
  }

  res.status(201).json({
    success: true,
    message: emailSent
      ? "Service request submitted. Confirmation sent to customer and notification sent to admin."
      : "Service request submitted. Email could not be sent — we will contact you by phone.",
    emailSent,
    ...(env.nodeEnv !== "production" && emailError ? { emailError } : {}),
    data: {
      id: request._id,
      name: request.name,
      email: request.email,
      phone: request.phone,
      address: request.address,
      product: request.product,
      issue: request.issue,
      serviceType: request.serviceType,
      preferredDate: request.preferredDate,
      timeSlot: request.timeSlot,
      notes: request.notes,
      status: request.status,
      createdAt: request.createdAt,
    },
  });
}

export async function listServiceRequests(req, res) {
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const requests = await ServiceRequest.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("-__v");

  res.json({ success: true, count: requests.length, data: requests });
}

export async function getServiceRequestById(req, res) {
  const request = await ServiceRequest.findById(req.params.id).select("-__v");
  if (!request) {
    throw new ApiError(404, "Service request not found");
  }
  res.json({ success: true, data: request });
}
