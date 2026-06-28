import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 15 },
    address: { type: String, required: true, trim: true, maxlength: 300 },
    product: {
      type: String,
      required: true,
      enum: ["Washing Machine", "Air Cooler", "Geyser"],
    },
    issue: { type: String, required: true, trim: true, maxlength: 120 },
    serviceType: {
      type: String,
      required: true,
      enum: ["Repair", "Installation", "Annual Maintenance", "Inspection / Quote"],
    },
    preferredDate: { type: Date, required: true },
    timeSlot: { type: String, required: true, trim: true },
    notes: { type: String, trim: true, maxlength: 500, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);
