import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;

  try {
    const users = await prisma.users.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: Number(limit) || 5,
      skip: Number(offset) || 0,
      include: {
        _count: {
          select: {
            threads: true,
            replies: true,
            likes: true,
            followings: true,
            followers: true,
          },
        },
      },
    });

    return res.status(200).json({ code: 200, status: "success", data: users });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { username, full_name, email, bio } = req.body;
    const photo_profile = req.file?.filename || "";

    if (!userId)
      return res
        .status(401)
        .json({ code: 401, status: "error", message: "Unauthorized" });

    if (!username || !full_name || !email)
      return res
        .status(400)
        .json({ code: 400, status: "error", message: "Bad Request" });

    const user = await prisma.users.update({
      where: {
        id: Number(userId),
      },
      data: {
        username,
        full_name,
        email,
        bio,
        photo_profile,
      },
    });
    return res.status(200).json({ code: 200, status: "success", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};
