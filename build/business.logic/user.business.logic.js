"use strict";
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
exports.deleteAllUsers = exports.deleteUserById = exports.getUserById = exports.getAllUsers = exports.updateUser = exports.loginUser = exports.signupUser = void 0;
const { hashSync, compareSync } = require("bcrypt");
const index_1 = require("../index");
const jwt = __importStar(require("jsonwebtoken"));
const secret_1 = require("../secret");
const root_1 = require("../errorHandle/root");
const BadRequestExpection_1 = require("../errorHandle/BadRequestExpection");
const NotFoundException_1 = require("../errorHandle/NotFoundException");
// User Signup
const signupUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, image } = data;
    // Check if the user already exists
    let user = yield index_1.prismaClient.user.findFirst({ where: { email } });
    if (user) {
        throw new BadRequestExpection_1.BadRequestExpection("User already exists", root_1.ErrorCode.USER_ALREADY_EXIST);
    }
    // Create a new user with default values for fields not provided
    user = yield index_1.prismaClient.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10),
            image,
            uploaded: false,
            purchasedCourses: {
                create: [],
            },
            downloadHistory: null,
            userGroups: {
                create: [],
            },
            orders: {
                create: [],
            },
        },
    });
    return user;
});
exports.signupUser = signupUser;
// User Login
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.prismaClient.user.findUnique({ where: { email } });
    if (!user) {
        throw new NotFoundException_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    if (!compareSync(password, user.password)) {
        throw new BadRequestExpection_1.BadRequestExpection("Incorrect password", root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({ userId: user.id }, secret_1.JWT_SECRET);
    return { user, token };
});
exports.loginUser = loginUser;
// Update User
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield index_1.prismaClient.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    user = yield index_1.prismaClient.user.update({
        where: { id },
        data,
    });
    return user;
});
exports.updateUser = updateUser;
// Get All Users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield index_1.prismaClient.user.findMany();
});
exports.getAllUsers = getAllUsers;
// Get User by ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.prismaClient.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    return user;
});
exports.getUserById = getUserById;
// Delete User by ID
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield index_1.prismaClient.user.findUnique({ where: { id } });
    if (!user) {
        throw new NotFoundException_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    yield index_1.prismaClient.user.delete({ where: { id } });
});
exports.deleteUserById = deleteUserById;
// Delete All Users
const deleteAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.prismaClient.user.deleteMany();
});
exports.deleteAllUsers = deleteAllUsers;
