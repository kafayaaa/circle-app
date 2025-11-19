import { Request, Response } from "express";

export const handleDashboard = (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ code: 200, status: "success", message: "Dashboard" });
};
