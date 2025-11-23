import dotenv from "dotenv";
dotenv.config();

import express from "express";

import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import authRouter from "./routers/auth";
import threadRouter from "./routers/thread";
import replyRouter from "./routers/reply";
import userRouter from "./routers/user";
import likeRouter from "./routers/like";
import sessionMiddleware from "./middlewares/session";

const app = express();

app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ALLOWED_ORIGINS, credentials: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/thread", threadRouter);
app.use("/api/v1/reply", replyRouter);
app.use("/api/v1/like", likeRouter);

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(
    `WebSocket server is running on port http://localhost:${process.env.PORT}`
  );
});
