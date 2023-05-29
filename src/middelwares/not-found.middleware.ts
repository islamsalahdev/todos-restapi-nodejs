import type { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(404).json({
    error: {
      message: `Cannot ${req.method} ${req.url} `,
      statusCode: 404,
    },
  });
};
