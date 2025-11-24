import express from "express";
import { authenticate } from "../middlewares/auth";
import { getThreadReplies, addThreadReplies } from "../controllers/reply";
import { upload_reply } from "../utils/multer";

const router = express.Router();

router.get("/:thread_id", authenticate, getThreadReplies);
router.post(
  "/add-reply/:thread_id",
  authenticate,
  upload_reply.single("image"),
  addThreadReplies
);

export default router;
