import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 15 },
    role: { type: String, required: true, trim: true, maxlength: 120 },
    experience: { type: String, trim: true, maxlength: 500, default: "" },
    message: { type: String, trim: true, maxlength: 1000, default: "" },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const CareerApplication = mongoose.model("CareerApplication", careerApplicationSchema);
