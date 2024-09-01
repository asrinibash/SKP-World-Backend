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
      } else {
        exception = new InternalException(
          "An unexpected error occured",
          error.message,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
