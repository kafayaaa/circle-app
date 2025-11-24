import { Queue } from "bullmq";
import { redisConfig } from "../config/redis";

export const threadQueue = new Queue("thread-queue", {
  connection: redisConfig,
});
