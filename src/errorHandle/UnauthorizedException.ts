import { ErrorCode } from "./root";

export class UnauthorizedException extends Error {
  public statusCode: number;
  public code: ErrorCode;

  constructor(message: string, code: ErrorCode = ErrorCode.UNAUTHORIZED) {
    super(message);
    this.name = "UnauthorizedException";
    this.statusCode = 401;
    this.code = code;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedException);
    }
  }
}
