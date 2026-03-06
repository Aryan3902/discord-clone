import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";
import { z, ZodError } from "zod";

export const validateBody = (schema: z.ZodTypeAny): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
      }
      res.status(500).send("Internal Server Error");
    }
  };
};
