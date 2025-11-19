import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRouter from "./routers/auth";
import threadRouter from "./routers/thread";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ALLOWED_ORIGINS, credentials: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/thread", threadRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
