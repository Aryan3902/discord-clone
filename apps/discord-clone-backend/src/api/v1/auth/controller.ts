import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateTokens,
} from "../../../services/AuthService.js";
import redisClient from "../../../config/redis.js";
import { env } from "../../../config/env.js";
import { Snowflake } from "../../../utils/snowflake.js";
import { usersTable } from "../../../db/postgres/schema.js";
import { db } from "../../../db/postgres/index.js";
import { eq, or } from "drizzle-orm";

const snowflake = new Snowflake();

export const register = async (req: Request, res: Response) => {
  const { username, password, email, name } = req.body;

  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(or(eq(usersTable.username, username), eq(usersTable.email, email)))
      .limit(1);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = snowflake.generateId();
  const user = { id: userId, username, passwordHash, name };

  const { accessToken, refreshToken } = await generateTokens(user.id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  try {
    await db.insert(usersTable).values({
      id: BigInt("0b" + userId),
      name,
      username,
      email,
      passwordHash,
      avatarUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create user" });
  }
  res.json({ accessToken });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const { accessToken, refreshToken } = await generateTokens(
    user.id.toString(),
  );

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
  try {
    // Decode without verifying expiration (they might be logging out an expired token)
    const decoded = jwt.decode(refreshToken);
    if (
      decoded &&
      typeof decoded === "object" &&
      "userId" in decoded &&
      "jti" in decoded
    ) {
      const { userId, jti } = decoded as { userId: string; jti: string };
      const redisKey = `auth:refresh:${userId}:${jti}`;
      await redisClient.del(redisKey);
    }
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
    if (typeof decoded === "string") {
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    const { userId, jti } = decoded;

    const redisKey = `auth:refresh:${userId}:${jti}`;
    const tokenExists = await redisClient.exists(redisKey);

    if (!tokenExists) {
      return res
        .status(403)
        .json({ error: "Refresh token is invalid or has been revoked" });
    }

    const newAccessToken = generateAccessToken(userId);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Refresh token is invalid or has been revoked" });
  }
};
