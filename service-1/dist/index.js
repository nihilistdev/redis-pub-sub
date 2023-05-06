"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
function main() {
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
//# sourceMappingURL=index.js.map