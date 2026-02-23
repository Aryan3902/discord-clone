import { env } from "../config/env";
import jwt from "jsonwebtoken";

// --- Constants ---
const ACCESS_SECRET = env.ACCESS_TOKEN_SECRET || "access_secret_key";
const REFRESH_SECRET = env.REFRESH_TOKEN_SECRET || "refresh_secret_key";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const generateTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};
