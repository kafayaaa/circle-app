import express from "express";
import { authenticate } from "../middlewares/auth";
import { getThreads, getThreadDetail, addThread } from "../controllers/thread";
import { upload_thread } from "../utils/multer";

const router = express.Router();

router.get("/thread", authenticate, getThreads);
router.get("/thread/:id", authenticate, getThreadDetail);

router.post(
  "/add-thread",
  authenticate,
  upload_thread.single("image"),
  addThread
);

export default router;
