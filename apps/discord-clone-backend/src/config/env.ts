import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  config();
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),

  DATABASE_URL: z.string().url(),

  WORKER_ID: z.number().int().min(0).max(1023),

  ACCESS_TOKEN_SECRET: z.string().min(32).max(32),
  REFRESH_TOKEN_SECRET: z.string().min(32).max(32),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid or missing environment variables:\n",
    JSON.stringify(parsedEnv.error.format(), null, 2),
  );
  process.exit(1); // Kill the server immediately
}

export const env = parsedEnv.data;
