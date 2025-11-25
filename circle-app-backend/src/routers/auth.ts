import express from "express";
import { handleRegister, handleLogin, getMe } from "../controllers/auth";
import { authCheck, authenticate } from "../middlewares/auth";

const router = express.Router();

router.post("/register", authCheck, handleRegister);
router.post("/login", authCheck, handleLogin);
router.get("/me", getMe);

export default router;
