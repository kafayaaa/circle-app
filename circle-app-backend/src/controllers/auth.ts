import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { registerUser, loginUser } from "../services/auth";
import { registerSchema, loginSchema } from "../schemas/auth";
export async function handleRegister(req: Request, res: Response) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { username, full_name, email, password } = req.body;

    const user = await registerUser({ username, full_name, email, password });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Registrasi berhasil. Akun berhasil dibuat.",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Invalid register" });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { identifier, password } = req.body;
    console.log("Received login:", req.body);

    const user = await loginUser({ identifier, password });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Login successfull.",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        code: 500,
        status: "error",
        message: error instanceof Error ? error.message : "Invalid Login",
      });
  }
}
