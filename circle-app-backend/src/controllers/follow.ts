import { Request, Response } from "express";
import prisma from "../prisma/client";
import { io } from "../app";

export const getFollowings = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  // const { userId } = req.params;
  if (!userId)
    return res
      .status(401)
      .json({ code: 401, status: "error", message: "Unauthorized" });

  console.log(userId);

  try {
    const followers = await prisma.following.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        follower_id: Number(userId),
      },
      include: {
        following: true,
      },
    });

    console.log(followers);

    return res.status(200).json({
      status: "success",
      data: followers,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  if (!userId)
    return res
      .status(401)
      .json({ code: 401, status: "error", message: "Unauthorized" });

  console.log(userId);

  try {
    const followings = await prisma.following.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        following_id: Number(userId),
      },
      include: {
        follower: true,
      },
    });

    console.log(followings);

    return res.status(200).json({
      status: "success",
      data: followings,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const addFollow = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const add_follow_id = req.body.add_follow_id;
  console.log("User ID: " + userId, "Follow User ID: " + add_follow_id);

  if (!userId)
    return res
      .status(401)
      .json({ code: 401, status: "error", message: "Unauthorized" });

  if (!add_follow_id)
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Bad Request" });

  if (Number(userId) === Number(add_follow_id))
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Bad Request" });

  try {
    const existingFollow = await prisma.following.findFirst({
      where: {
        follower_id: Number(userId),
        following_id: Number(add_follow_id),
      },
    });

    if (existingFollow) {
      return res.status(400).json({
        code: 400,
        status: "error",
        message: "Already following this user",
      });
    }

    const follow = await prisma.following.create({
      data: {
        follower_id: Number(userId),
        following_id: Number(add_follow_id),
      },
    });

    io.to(add_follow_id.toString()).emit("follow_event", {
      type: "FOLLOWER_ADD",
      data: follow,
    });

    io.to(userId.toString()).emit("follow_event", {
      type: "FOLLOWING_ADD",
      data: follow,
    });

    console.log(follow);
    return res.status(200).json({ code: 200, status: "success", data: follow });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return res
        .status(409)
        .json({ code: 409, status: "error", message: "Already following" });
    }
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const unfollow = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const unfollow_id = req.body.unfollow_id;
  console.log("User ID: " + userId, "Unfollow User ID: " + unfollow_id);

  if (!userId)
    return res
      .status(401)
      .json({ code: 401, status: "error", message: "Unauthorized" });

  if (!unfollow_id)
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Bad Request" });

  if (Number(userId) === Number(unfollow_id))
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Bad Request" });

  try {
    const unfollow = await prisma.following.deleteMany({
      where: {
        follower_id: Number(userId),
        following_id: Number(unfollow_id),
      },
    });

    io.to(unfollow_id.toString()).emit("follow_event", {
      type: "FOLLOWER_REMOVE",
      data: { follower_id: userId, following_id: unfollow_id },
    });

    io.to(userId.toString()).emit("follow_event", {
      type: "FOLLOWING_REMOVE",
      data: { follower_id: userId, following_id: unfollow_id },
    });

    console.log(unfollow);
    return res
      .status(200)
      .json({ code: 200, status: "success", data: unfollow });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const getMyFollowings = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ code: 401, status: "error", message: "Unauthorized" });
  }

  try {
    const list = await prisma.following.findMany({
      where: { follower_id: Number(userId) },
      include: {
        following: {
          select: {
            id: true,
            username: true,
            full_name: true,
            email: true,
            photo_profile: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const payload = list.map((item) => ({
      id: item.id,
      follower_id: item.follower_id,
      following_id: item.following_id,
      created_at: item.created_at,
      following_user: item.following,
    }));

    return res
      .status(200)
      .json({ code: 200, status: "success", data: payload });
  } catch (err) {
    console.error("getMyFollowings:", err);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};

export const getMyFollowers = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ code: 401, status: "error", message: "Unauthorized" });
  }

  try {
    const list = await prisma.following.findMany({
      where: { following_id: Number(userId) },
      include: {
        follower: {
          select: {
            id: true,
            username: true,
            full_name: true,
            email: true,
            photo_profile: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const payload = list.map((item) => ({
      id: item.id,
      follower_id: item.follower_id,
      following_id: item.following_id,
      created_at: item.created_at,
      follower_user: item.follower,
    }));

    return res
      .status(200)
      .json({ code: 200, status: "success", data: payload });
  } catch (err) {
    console.error("getMyFollowings:", err);
    return res
      .status(500)
      .json({ code: 500, status: "error", message: "Internal Server Error" });
  }
};
