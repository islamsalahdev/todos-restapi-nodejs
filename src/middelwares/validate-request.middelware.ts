import type { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (data.body) {
      req.body = data.body;
    }

    next();
  };
