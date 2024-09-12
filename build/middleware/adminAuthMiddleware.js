"use strict";
// middlewares/authMiddleware.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("../secret");
const UnauthorizedException_1 = require("../errorHandle/UnauthorizedException");
const root_1 = require("../errorHandle/root");
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new UnauthorizedException_1.UnauthorizedException("Token not provided", root_1.ErrorCode.UNAUTHORIZED));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secret_1.JWT_SECRET);
        req.adminId = decoded.adminId; // Attach adminId to the request object
        next();
    }
    catch (error) {
        next(new UnauthorizedException_1.UnauthorizedException("Invalid token", root_1.ErrorCode.UNAUTHORIZED));
    }
};
exports.authenticateAdmin = authenticateAdmin;
