import Redis from "ioredis";
import express from "express";

const redis = new Redis();

async function main(): Promise<void> {
  const app = express();

  app.get("/test", async (_req, res) => {
    await redis.subscribe("article", (err, count) => {
      if (err) console.error("==> Error occured: ", err);
      console.log("Subscribed to %d", count);
    });

    redis.on("message", (channel, message) => {
      console.log(
        "===> Received message from channel [%s]: ",
        channel,
        message
      );
      const json = JSON.parse(message);
      console.log("==> Here is what you missed: ", json);
    });

    res.status(200).send({
      status: "Published data to redis",
    });
  });

  app.listen(4001, () => {
    console.log("Server on :4001");
  });
}

main();
