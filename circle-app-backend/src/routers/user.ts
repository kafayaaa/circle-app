import express from "express";
import { authenticate } from "../middlewares/auth";
import { handleDashboard } from "../controllers/user";

const router = express.Router();

router.get("/dashboard", authenticate, handleDashboard);

export default router;
