// src/controllers/authController.ts
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserRegisterationSchema } from "@discord-clone/shared-types";
import type { User } from "../types/user.js";

// --- Mock Data ---
const users: User[] = [
  { id: "1", username: "testuser", passwordHash: "password123" },
];

// In production, store these in a DB table (e.g., "refresh_tokens")
let refreshTokens: string[] = [];

// --- Constants ---
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret_key";
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key";

const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" });
};

const generateTokens = (userId: string) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  const validatedData = UserRegisterationSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({ error: validatedData.error.message });
  }
  const { username, password, name } = validatedData.data;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: "1", username, passwordHash };

  const { accessToken, refreshToken } = generateTokens(user.id);
  refreshTokens.push(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  users.push(user);
  res.json({ accessToken });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const { accessToken, refreshToken } = generateTokens(user.id);
  refreshTokens.push(refreshToken);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });
  res.json({ message: "Logged out successfully" });
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const isRefreshTokenValid = refreshTokens.includes(refreshToken);
  if (!isRefreshTokenValid) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
  if (typeof decoded === "string") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = decoded.userId;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const newAccessToken = generateAccessToken(user.id);
  res.json({ accessToken: newAccessToken });
};
