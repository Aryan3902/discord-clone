import express, { type Request, type Response } from "express";
import authRoutes from "./api/v1/auth/routes.js";
import userRoutes from "./api/v1/users/routes.js";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { connectRedis } from "./config/redis.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser()); // Add this middleware BEFORE routes

connectRedis();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
