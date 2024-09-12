"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const root_1 = require("./errorHandle/root");
const internalException_1 = require("./errorHandle/internalException");
const errorMiddleware = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof root_1.HttpException) {
                exception = error;
            }
            else if (error instanceof Error) {
                // Here, we know `error` has the properties of `Error`
                exception = new internalException_1.InternalException("An unexpected error occurred", error.message, root_1.ErrorCode.INTERNAL_EXCEPTION);
            }
            else {
                // Handle cases where the error is not an instance of `Error`
                exception = new internalException_1.InternalException("An unexpected error occurred", "Unknown error", root_1.ErrorCode.INTERNAL_EXCEPTION);
            }
            next(exception);
        }
    });
};
exports.errorMiddleware = errorMiddleware;
