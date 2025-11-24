import express from "express";
import { authenticate } from "../middlewares/auth";
import { getUsers, updateUser } from "../controllers/user";
import { upload_profile } from "../utils/multer";

const router = express.Router();

router.get("/users", authenticate, getUsers);
router.put(
  "/update-user",
  authenticate,
  upload_profile.single("photo_profile"),
  updateUser
);

export default router;
