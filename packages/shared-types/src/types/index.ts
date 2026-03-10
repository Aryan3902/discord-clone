import { UserLoginSchema, UserRegisterationSchema } from "../zod-schema";
import { z } from "zod";

export type UserRegisterationType = z.infer<typeof UserRegisterationSchema>;
export type UserLoginType = z.infer<typeof UserLoginSchema>;
export type UserDBType = {
  id: string;
  username: string;
  passwordHash: string;
};
