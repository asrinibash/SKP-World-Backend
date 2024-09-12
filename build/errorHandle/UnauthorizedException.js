"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const root_1 = require("./root");
class UnauthorizedException extends Error {
    constructor(message, code = root_1.ErrorCode.UNAUTHORIZED) {
        super(message);
        this.name = "UnauthorizedException";
        this.statusCode = 401;
        this.code = code;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedException);
        }
    }
}
exports.UnauthorizedException = UnauthorizedException;
