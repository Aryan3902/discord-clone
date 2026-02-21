import { z } from "zod";

export const UserRegisterationSchema = z.object({
  username: z.string().min(3).max(20),
  name: z.string().min(3).max(20),
  password: z.string().min(8).max(32),
});
