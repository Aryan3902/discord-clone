import { env } from "../config/env";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis";

// --- Constants ---
const ACCESS_SECRET = env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateTokens = async (userId: string) => {
  const accessToken = generateAccessToken(userId);

  /**
   * Do not store the raw refresh token string as the Redis key.
   * It's unnecessarily long and poses a slight security risk if your Redis instance is ever exposed.
   * Instead, generate a unique identifier (a UUID) for the token, called the jti (JWT ID).
   * Include this jti in the token's payload, and use it as part of your Redis key.
   * By including the userId in the Redis key, you unlock the ability to implement a "Log out of all devices" feature.
   * You can use the Redis SCAN command to find all keys matching auth:refresh:123:* and delete them simultaneously.
   */
  const jti = crypto.randomUUID();
  const refreshToken = jwt.sign({ userId, jti }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const redisKey = `auth:refresh:${userId}:${jti}`;
  await redisClient.setEx(redisKey, 7 * 24 * 60 * 60, refreshToken);

  return { accessToken, refreshToken };
};
