import { Router } from "express";
import { register, login, logout, refresh } from "./controller.js";
import { validateBody } from "../../../middlewares/validateMiddleware.js";
import {
  UserLoginSchema,
  UserRegisterationSchema,
} from "@discord-clone/shared-types";

const router: Router = Router();

router.post("/register", validateBody(UserRegisterationSchema), register);
router.post("/login", validateBody(UserLoginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;
