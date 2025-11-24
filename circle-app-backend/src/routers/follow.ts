import express from "express";
import { authenticate } from "../middlewares/auth";

import {
  getFollowers,
  addFollow,
  getFollowings,
  unfollow,
  getMyFollowings,
} from "../controllers/follow";

const router = express.Router();

router.get("/followers", authenticate, getFollowers);
router.get("/followings", authenticate, getFollowings);
router.post("/add-follow", authenticate, addFollow);
router.delete("/unfollow", authenticate, unfollow);
router.get("/me", authenticate, getMyFollowings);

export default router;
