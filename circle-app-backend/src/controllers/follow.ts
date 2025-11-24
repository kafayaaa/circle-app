import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getFollowings = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
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
        following_id: Number(userId),
      },
      include: {
        follower_user: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
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

export const addFollow = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
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

  if (userId === add_follow_id)
    return res
      .status(400)
      .json({ code: 400, status: "error", message: "Bad Request" });

  try {
    const double = await prisma.following.findFirst({
      where: {
        following_id: Number(userId),
        follower_id: Number(add_follow_id),
      },
    });

    if (double) {
      await prisma.following.deleteMany({
        where: {
          following_id: Number(userId),
          follower_id: Number(add_follow_id),
        },
      });

      return res
        .status(200)
        .json({
          code: 200,
          status: "success",
          message: "Unfollow",
          data: double,
        });
    }

    const follow = await prisma.following.create({
      data: {
        following_id: Number(userId),
        follower_id: Number(add_follow_id),
      },
    });

    console.log(follow);
    return res.status(200).json({ code: 200, status: "success", data: follow });
  } catch (error) {
    console.log(error);
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
        follower_id: Number(userId),
      },
      include: {
        following_user: {
          select: {
            id: true,
            username: true,
            full_name: true,
            photo_profile: true,
          },
        },
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

export const unfollow = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
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

  if (userId === unfollow_id)
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
