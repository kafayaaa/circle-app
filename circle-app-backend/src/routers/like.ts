import express from "express";
import { authenticate } from "../middlewares/auth";
import { getLike, handleLike } from "../controllers/like";

const router = express.Router();

router.get("/likes", authenticate, getLike);
router.post("/handle-like", authenticate, handleLike);

export default router;
