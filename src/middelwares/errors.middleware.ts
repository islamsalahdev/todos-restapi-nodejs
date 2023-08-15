import type { Request, NextFunction, Response } from "express";
import { CustomApiError } from "../errors";
import { ZodIssue } from "zod";
import { config } from "../config/config";
import { Error } from "mongoose";

type ApiError = {
  message: string;
  statusCode: number;
  errors?: string[];
};

export const errorsHandlermiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiError: ApiError = {
    message:
      config.NODE_ENV === "development"
        ? err.message
        : "some thing went wrong try again",
    statusCode: 500,
  };

  if (err instanceof CustomApiError) {
    apiError.statusCode = err.statusCode;
    apiError.message = err.message;
  }

  // Mongo duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    apiError.message = ` Invalid ${Object.keys(
      err.keyPattern
    )} or already exists`;
    apiError.statusCode = 400;
  }

  // Mongoo shcema ValidationError
  if (err instanceof Error.ValidationError) {
    apiError.message = "validation failed";
    apiError.errors = Object.values(err.errors).map((e) => e.message);
    apiError.statusCode = 422;
  }

  // Zod schema ValidationError
  if (err.name === "ZodError") {
    apiError.message = "validation failed";
    apiError.statusCode = 422;
    apiError.errors = err.issues.map((e: ZodIssue) => e.message);
  }

  //  Mongo Cast Types errors
  if (err.name === "CastError") {
    apiError.message = "No items found";
    apiError.statusCode = 404;
  }


  res.status(apiError.statusCode).json({
    error: apiError,
    stack: config.NODE_ENV === "development" ? err.stack : undefined,
  });
};
