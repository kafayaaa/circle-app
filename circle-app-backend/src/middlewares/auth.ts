import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded as any;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
