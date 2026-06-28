import { CareerApplication } from "../models/CareerApplication.js";

export async function createCareerApplication(req, res) {
  const { fullName, email, phone, role, experience, message } = req.body;

  const application = await CareerApplication.create({
    fullName,
    email,
    phone,
    role,
    experience: experience || "",
    message: message || "",
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully. We will contact you soon.",
    data: {
      id: application._id,
      fullName: application.fullName,
      role: application.role,
      status: application.status,
      createdAt: application.createdAt,
    },
  });
}

export async function listCareerApplications(_req, res) {
  const applications = await CareerApplication.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .select("-__v");

  res.json({ success: true, count: applications.length, data: applications });
}
