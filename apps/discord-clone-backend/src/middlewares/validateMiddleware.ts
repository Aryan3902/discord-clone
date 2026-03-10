import {
  type Request,
  type Response,
  type NextFunction,
  type RequestHandler,
} from "express";
import { z, ZodError } from "zod";

/**
 * Middleware to validate the body of the request using Zod.
 * @param schema - The Zod schema to validate the body against.
 * @returns A RequestHandler function that validates the body of the request and returns a 400 status code if the validation fails.
 */
export const validateBody = (schema: z.ZodTypeAny): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          errors: error.errors,
        });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
