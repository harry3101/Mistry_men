import { Router } from "express";
import { chatWithBot } from "../controllers/chat.controller.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(chatWithBot));

export default router;
