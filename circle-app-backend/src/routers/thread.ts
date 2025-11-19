import express from "express";
import { authenticate } from "../middlewares/auth";
import { getThreads } from "../controllers/thread";

const router = express.Router();

router.get("/thread", authenticate, getThreads);

export default router;
