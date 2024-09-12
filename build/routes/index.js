"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rootRouter = (0, express_1.Router)();
const adminRoutes_1 = __importDefault(require("./adminRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const courseRoutes_1 = __importDefault(require("./courseRoutes"));
// * Admin Routes
rootRouter.use("/admin", adminRoutes_1.default);
// * User Routes
rootRouter.use("/user", userRoutes_1.default);
// * Category Routes
rootRouter.use("/category", categoryRoutes_1.default);
// * Course Routes
rootRouter.use("/course", courseRoutes_1.default);
exports.default = rootRouter;
