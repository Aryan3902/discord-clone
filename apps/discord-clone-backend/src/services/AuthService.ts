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

  const jti = crypto.randomUUID();
  const refreshToken = jwt.sign({ userId, jti }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  const redisKey = `auth:refresh:${userId}:${jti}`;
  await redisClient.setEx(redisKey, 7 * 24 * 60 * 60, refreshToken);

  return { accessToken, refreshToken };
};
