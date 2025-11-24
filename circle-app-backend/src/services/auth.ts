import bcrypt from "bcrypt";
import prisma from "../prisma/client";
import { signToken } from "../utils/jwt";
export async function registerUser({
  username,
  full_name,
  email,
  password,
}: {
  username: string;
  full_name: string;
  email: string;
  password: string;
}) {
  if (!email.match(/@/) || password.length < 8) {
    throw new Error("Invalid email or password");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      username,
      full_name,
      email,
      password: hashedPassword,
    },
  });

  const token = signToken({ id: user.id });
  return { ...user, token };
}

export async function loginUser({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const user = await prisma.users.findUnique({
    where: isEmail ? { email: identifier } : { username: identifier },
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
  if (!user) {
    throw new Error("User not found");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid password");
  }
  const token = signToken({ id: user.id });
  return { ...user, token };
}
