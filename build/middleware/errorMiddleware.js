"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const root_1 = require("../errorHandle/root");
const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        message: error.message || "An unexpected Error",
        error: error.errors || {},
        errorCode: error.errorCode || root_1.ErrorCode.UNKNOWN_ERROR,
    });
};
exports.errorMiddleware = errorMiddleware;
