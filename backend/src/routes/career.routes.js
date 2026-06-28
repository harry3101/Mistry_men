import { Router } from "express";
import { body } from "express-validator";
import {
  createCareerApplication,
  listCareerApplications,
} from "../controllers/career.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

const careerRules = [
  body("fullName").trim().notEmpty().withMessage("Full name is required").isLength({ max: 80 }),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone")
    .trim()
    .matches(/^\+?[0-9\s-]{10,15}$/)
    .withMessage("Valid phone number is required"),
  body("role").trim().notEmpty().withMessage("Role is required").isLength({ max: 120 }),
  body("experience").optional().isLength({ max: 500 }),
  body("message").optional().isLength({ max: 1000 }),
];

router.post("/", careerRules, validateRequest, asyncHandler(createCareerApplication));
router.get("/", asyncHandler(listCareerApplications));

export default router;
