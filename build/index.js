"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const secret_1 = require("./secret");
const routes_1 = __importDefault(require("./routes"));
const app = express();
app.use(cors({
    origin: "*", // Your frontend URL
    methods: "GET, POST, PUT, OPTIONS, DELETE", // Removed DELETE method
    allowedHeaders: "Authorization, Content-Type", // Include the headers you want to allow
}));
app.use(express.json());
app.use("/api/v1", routes_1.default); //* Entry point for all routes
exports.prismaClient = new PrismaClient({
    log: ["query"],
});
app.use(errorMiddleware);
app.listen(secret_1.PORT, () => {
    console.log(`Server running at : ${secret_1.PORT}`);
});
