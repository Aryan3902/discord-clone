import { UserRegisterationSchema } from "../zod-schema";
import { z } from "zod";

export type UserRegisterationType = z.infer<typeof UserRegisterationSchema>;
