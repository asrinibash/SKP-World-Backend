import { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./errorHandle/root";
import { InternalException } from "./errorHandle/internalException";

export const errorMiddleware = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof Error) {
        // Here, we know `error` has the properties of `Error`
        exception = new InternalException(
          "An unexpected error occurred",
          error.message,
          ErrorCode.INTERNAL_EXCEPTION
        );
      } else {
        // Handle cases where the error is not an instance of `Error`
        exception = new InternalException(
          "An unexpected error occurred",
          "Unknown error",
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
