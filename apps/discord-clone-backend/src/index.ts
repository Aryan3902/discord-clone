import express, { type Request, type Response } from "express";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); // Add this middleware BEFORE routes

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript + Express!");
});

app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
