"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const express_1 = __importDefault(require("express"));
const redis = new ioredis_1.default();
async function main() {
    const app = (0, express_1.default)();
    app.get("/test", async (_req, res) => {
        await redis.subscribe("article", (err, count) => {
            if (err)
                console.error("==> Error occured: ", err);
            console.log("Subscribed to %d", count);
        });
        redis.on("message", (channel, message) => {
            console.log("===> Received message from channel [%s]: ", channel, message);
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
//# sourceMappingURL=index.js.map