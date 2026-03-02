import { env } from "./env";

import { createClient, type RedisClientType } from "redis";

// Configure the client based on environment
const redisClient: RedisClientType = createClient({
  url: env.REDIS_URL, // e.g., redis://user:pass@host:port
  socket: {
    reconnectStrategy: (retries: number) => {
      // Reconnect logic: exponential backoff
      if (retries > 10) {
        console.error(
          "Too many attempts to reconnect. Redis connection was terminated",
        );
        return new Error("Too many retries.");
      }
      return Math.min(retries * 50, 2000);
    },
  },
});

// Event Listeners for observability
redisClient.on("error", (err: Error) =>
  console.error("Redis Client Error", err),
);
redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("ready", () => console.log("Redis Client Ready"));
redisClient.on("end", () => console.log("Redis Client Disconnected"));

// Initialize connection
export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis", err);
    process.exit(1); // Exit if Redis is critical to app startup
  }
};

export default redisClient;
