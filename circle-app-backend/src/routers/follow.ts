import express from "express";
import { authenticate } from "../middlewares/auth";

import {
  getFollowers,
  addFollow,
  getFollowings,
  unfollow,
} from "../controllers/follow";

const router = express.Router();

router.get("/followers", authenticate, getFollowers);
router.get("/followings", authenticate, getFollowings);
router.post("/add-follow", authenticate, addFollow);
router.delete("/unfollow", authenticate, unfollow);

export default router;
