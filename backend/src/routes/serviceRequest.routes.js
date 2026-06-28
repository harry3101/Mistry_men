import { Router } from "express";
import { body } from "express-validator";
import {
  createServiceRequest,
  getServiceRequestById,
  listServiceRequests,
} from "../controllers/serviceRequest.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

const serviceRequestRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 80 }),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("phone")
    .trim()
    .matches(/^\+?[0-9\s-]{10,15}$/)
    .withMessage("Valid phone number is required"),
  body("address").trim().notEmpty().withMessage("Address is required").isLength({ max: 300 }),
  body("product")
    .isIn(["Washing Machine", "Air Cooler", "Geyser"])
    .withMessage("Valid product is required"),
  body("issue").trim().notEmpty().withMessage("Issue is required").isLength({ max: 120 }),
  body("serviceType")
    .isIn(["Repair", "Installation", "Annual Maintenance", "Inspection / Quote"])
    .withMessage("Valid service type is required"),
  body("preferredDate").isISO8601().withMessage("Valid preferred date is required"),
  body("timeSlot").trim().notEmpty().withMessage("Time slot is required"),
  body("notes").optional().isLength({ max: 500 }),
];

router.post("/", serviceRequestRules, validateRequest, asyncHandler(createServiceRequest));
router.get("/", asyncHandler(listServiceRequests));
router.get("/:id", asyncHandler(getServiceRequestById));

export default router;
