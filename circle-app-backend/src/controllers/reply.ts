import { Request, Response } from "express";
import prisma from "../prisma/client";
import { io } from "../app";

export const getThreadReplies = async (req: Request, res: Response) => {
  const { thread_id } = req.params;
  if (!thread_id)
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Thread id is required" });
  try {
    const relplies = await prisma.replies.findMany({
      where: {
        thread_id: Number(thread_id),
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
      },
    });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Get Data Thread Success",
      data: relplies,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const addThreadReplies = async (req: Request, res: Response) => {
  const { thread_id } = req.params;
  const userId = (req as any).user.id;
  const content = req.body.content || "";
  const image = req.file?.filename || "";

  if (!thread_id)
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Thread id is required" });

  if (!content && !image)
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Content or Image is required",
    });

  try {
    const reply = await prisma.replies.create({
      data: {
        thread_id: Number(thread_id),
        user_id: Number(userId),
        content,
        image,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
      },
    });

    io.emit("new_reply", reply);

    return res.status(200).json({ code: 200, status: "success", data: reply });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};
