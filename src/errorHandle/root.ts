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
  INTERNAL_SERVER_ERROR = 500,
  INVALID_RESET_TOKEN = 6001,
  UNKNOWN_ERROR = 8001,
  NOT_FOUND = 9001,
  CREATION_ERROR = 9002,
  CATEGORY_NOT_FOUND = 7001,
  CATEGORY_NAME_MISMATCH = 7002,
  CATEGORY_ALREADY_EXIST = 7003,
  COURSE_ALREADY_EXIST = 5001,
  COURSE_ALREADY_PURCHASED=5003,
  COURSE_NOT_FOUND = 5002,
  ORDER_ALREADY_EXIST = 6001,
  ORDER_NOT_FOUND = 6002,
  ORDERS_NOT_FOUND=6003,
  GROUP_NOT_FOUND=9001,
  GROUP_ALREADY_EXIST=9002,
  BAD_REQUEST=4001,
  PAYMENT_ALREADY_CAPTURED=2001,
  PAYMENT_FAILED=2005,
  UPDATE_FAILED,
  INVALID_ID,
  FILE_TOO_LARGE,
  DB_ERROR,
  ADMIN_NOT_FOUND,
  INVALID_ID_FORMAT,
  USER_STATUS_NOT_ACTIVE,
}
