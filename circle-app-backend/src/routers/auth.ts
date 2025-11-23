import express from "express";
import { handleRegister, handleLogin } from "../controllers/auth";
import { authCheck } from "../middlewares/auth";

const router = express.Router();

router.post("/register", authCheck, handleRegister);
router.post("/login", authCheck, handleLogin);

export default router;
