import { createClient } from "redis";

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

redisClient.on("connect", () => console.log("Connected to redis"));
redisClient.on("error", (err) =>
  console.log("Failed to connect to redis", err.message)
);

await redisClient.connect();

export default redisClient;
