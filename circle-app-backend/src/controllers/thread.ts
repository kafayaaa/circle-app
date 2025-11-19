import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getThreads = async (req: Request, res: Response) => {
  const threads = await prisma.threads.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          full_name: true,
          username: true,
          photo_profile: true,
        },
      },
    },
  });
  return res.status(200).json({ code: 200, status: "success", data: threads });
};
