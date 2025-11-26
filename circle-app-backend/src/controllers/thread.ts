import { Request, Response } from "express";
import prisma from "../prisma/client";
import client from "../utils/redisClient";
import { io } from "../app";
import { threadQueue } from "../queues";

export const getThreads = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const userId = (req as any).user?.id;

  try {
    const threads = await prisma.threads.findMany({
      orderBy: {
        created_at: "desc",
      },
      // take: Number(limit) || ,
      skip: Number(offset) || 0,
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
        likes: true,
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    });

    const formatted = threads.map((thread) => ({
      ...thread,
      is_liked: thread.likes.some((like) => like.user_id === userId),
    }));

    return res
      .status(200)
      .json({ code: 200, status: "success", data: formatted });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const getMyThreads = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const userId = (req as any).user?.id;

  try {
    const cacheKey = `threads:${userId}`;
    const cacheThreads = await client.get(cacheKey);
    if (cacheThreads) {
      console.log("CACHE HIT");
      return res
        .status(200)
        .json({ code: 200, status: "success", data: JSON.parse(cacheThreads) });
    }

    console.log("CACHE MISS");

    const threads = await prisma.threads.findMany({
      where: {
        created_by: Number(userId),
      },
      orderBy: {
        created_at: "desc",
      },
      // take: Number(limit) || ,
      skip: Number(offset) || 0,
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
        likes: true,
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    });

    const formatted = threads.map((thread) => ({
      ...thread,
      is_liked: thread.likes.some((like) => like.user_id === userId),
    }));

    await client.setEx(cacheKey, 60, JSON.stringify(formatted));

    return res
      .status(200)
      .json({ code: 200, status: "success", data: formatted });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const getThreadDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Thread id is required" });
  try {
    const thread = await prisma.threads.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
        _count: {
          select: { replies: true, likes: true },
        },
        likes: true,
      },
    });
    return res.status(200).json({ code: 200, status: "success", data: thread });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const addThread = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Content is required",
      });
    }

    const image = req.file?.filename || "";

    const thread = await prisma.threads.create({
      data: {
        created_by: Number(userId),
        content,
        image,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
      },
    });

    await threadQueue.add("new-thread", {
      image: image,
    });

    io.emit("new_thread", thread);

    return res.status(200).json({
      code: 200,
      status: "success",
      data: thread,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      status: "error",
      message: "Internal Server Error",
    });
  }
};
