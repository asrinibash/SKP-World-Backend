import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "../errorHandle/root";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "An unexpected Error",
    error: error.errors || {},
    errorCode: error.errorCode || ErrorCode.UNKNOWN_ERROR,
  });
};
