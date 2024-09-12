"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, error, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.errors = error;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}
exports.HttpException = HttpException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXIST"] = 1002] = "USER_ALREADY_EXIST";
    ErrorCode[ErrorCode["INCORRECT_PASSWORD"] = 1003] = "INCORRECT_PASSWORD";
    ErrorCode[ErrorCode["UNPROCESSABLE_ENTITY"] = 2001] = "UNPROCESSABLE_ENTITY";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 4001] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ErrorCode[ErrorCode["INVALID_RESET_TOKEN"] = 6001] = "INVALID_RESET_TOKEN";
    ErrorCode[ErrorCode["UNKNOWN_ERROR"] = 8001] = "UNKNOWN_ERROR";
    ErrorCode[ErrorCode["NOT_FOUND"] = 9001] = "NOT_FOUND";
    ErrorCode[ErrorCode["CREATION_ERROR"] = 9002] = "CREATION_ERROR";
    ErrorCode[ErrorCode["CATEGORY_NOT_FOUND"] = 7001] = "CATEGORY_NOT_FOUND";
    ErrorCode[ErrorCode["CATEGORY_NAME_MISMATCH"] = 7002] = "CATEGORY_NAME_MISMATCH";
    ErrorCode[ErrorCode["CATEGORY_ALREADY_EXIST"] = 7003] = "CATEGORY_ALREADY_EXIST";
    ErrorCode[ErrorCode["COURSE_ALREADY_EXIST"] = 5001] = "COURSE_ALREADY_EXIST";
    ErrorCode[ErrorCode["COURSE_NOT_FOUND"] = 5002] = "COURSE_NOT_FOUND";
    ErrorCode[ErrorCode["ORDER_ALREADY_EXIST"] = 6001] = "ORDER_ALREADY_EXIST";
    ErrorCode[ErrorCode["ORDER_NOT_FOUND"] = 6002] = "ORDER_NOT_FOUND";
    ErrorCode[ErrorCode["ORDERS_NOT_FOUND"] = 6003] = "ORDERS_NOT_FOUND";
    ErrorCode[ErrorCode["UPDATE_FAILED"] = 6004] = "UPDATE_FAILED";
    ErrorCode[ErrorCode["INVALID_ID"] = 6005] = "INVALID_ID";
    ErrorCode[ErrorCode["FILE_TOO_LARGE"] = 6006] = "FILE_TOO_LARGE";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
