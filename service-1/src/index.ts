import Redis from "ioredis";

const redis = new Redis();

function main(): void {
  setInterval(() => {
    const data = {
      id: "123",
      data: "Testing 123",
    };

    redis.publish("article", JSON.stringify(data));
    console.log("==> Publish message");
  }, 1000);
}

main();
