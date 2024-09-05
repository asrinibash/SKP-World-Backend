export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    error: any,
    statusCode: number,
    errorCode: ErrorCode
  ) {
    super(message);
    this.message = message;
    this.errors = error;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED = 4001,
  PRODUCT_NOT_FOUND = 5001,
  INTERNAL_SERVER_ERROR = 500,
  INVALID_RESET_TOKEN = 6001,
  CATEGORY_NOT_FOUND = 7001,
  UNKNOWN_ERROR = 8001,
  NOT_FOUND = 9001,
  CREATION_ERROR = 9002,
  CATEGORY_NAME_MISMATCH = 9003,
  CATEGORY_ALREADY_EXIST = 9004,
  UPDATE_FAILED,
  INVALID_ID,
  FILE_TOO_LARGE,
}
