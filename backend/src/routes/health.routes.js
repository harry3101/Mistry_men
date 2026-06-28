import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Mistry API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
