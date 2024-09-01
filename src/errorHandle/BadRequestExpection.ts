import { ErrorCode, HttpException } from "./root";

export class BadRequestExpection extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 400,errorCode );
  }
}
