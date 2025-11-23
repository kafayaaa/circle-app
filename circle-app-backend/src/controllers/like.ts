import { Request, Response } from "express";
import prisma from "../prisma/client";
import { io } from "../app";

export const getLike = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const threadId = req.body.thread_id;

    if (!userId) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized",
      });
    }

    const likes = await prisma.likes.count({
      where: {
        thread_id: threadId,
      },
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      data: likes,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const handleLike = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const threadId = req.body.thread_id;
    let newCount;

    if (!userId) {
      return res.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized",
      });
    }

    const existingLike = await prisma.likes.findFirst({
      where: {
        thread_id: threadId,
        user_id: userId,
      },
    });

    if (existingLike) {
      await prisma.likes.delete({
        where: { id: existingLike.id },
      });
    } else {
      await prisma.likes.create({
        data: {
          thread_id: threadId,
          user_id: userId,
        },
      });
    }

    // Ambil count terbaru SELALU
    newCount = await prisma.likes.count({
      where: { thread_id: threadId },
    });

    // Emit SELALU, baik like maupun unlike
    io.emit("like_updated", {
      thread_id: threadId,
      user_id: userId,
      likes_count: newCount,
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        thread_id: threadId,
        user_id: userId,
        likes_count: newCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      error: "Internal Server Error",
    });
  }
};
