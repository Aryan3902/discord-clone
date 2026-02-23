// src/controllers/authController.ts
import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import {
  UserRegisterationSchema,
  type UserDBType,
} from "@discord-clone/shared-types";
import {
  generateAccessToken,
  generateTokens,
  verifyAccessToken,
} from "../../../services/AuthService.js";

// --- Mock Data ---
const users: UserDBType[] = [
  { id: "1", username: "testuser", passwordHash: "password123" },
];

// In production, store these in a DB table (e.g., "refresh_tokens")
let refreshTokens: string[] = [];

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

  const decoded = verifyAccessToken(refreshToken);
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
