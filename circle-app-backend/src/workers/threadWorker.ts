import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "threadQueue",
  async (job) => {
    console.log(">>> Worker menerima job:", job.id);
    console.log("Payload:", job.data);

    // simulasi proses
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(">>> Worker selesai memproses job");
    return true;
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} selesai ✔`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} gagal ❌`, err);
});
