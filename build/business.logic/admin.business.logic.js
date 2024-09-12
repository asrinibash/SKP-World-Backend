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
exports.deleteAllAdmins = exports.deleteAdminById = exports.getAdminById = exports.getAllAdmins = exports.updateAdmin = exports.loginAdmin = exports.signupAdmin = void 0;
// admin-auth.business.logic.ts
const { hashSync, compareSync } = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const index_1 = require("../index");
const secret_1 = require("../secret");
const root_1 = require("../errorHandle/root");
const BadRequestExpection_1 = require("../errorHandle/BadRequestExpection");
const NotFoundException_1 = require("../errorHandle/NotFoundException");
// Admin Signup
const signupAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, image } = data;
    try {
        // Check if the admin already exists
        let admin = yield index_1.prismaClient.admin.findFirst({ where: { email } });
        if (admin) {
            throw new BadRequestExpection_1.BadRequestExpection("Admin already exists", root_1.ErrorCode.USER_ALREADY_EXIST);
        }
        // Create a new admin with the provided details
        admin = yield index_1.prismaClient.admin.create({
            data: {
                name,
                email,
                password: hashSync(password, 10),
                image,
            },
        });
        return admin;
    }
    catch (error) {
        console.error("Error in signupAdmin:", error);
        throw error;
    }
});
exports.signupAdmin = signupAdmin;
// Admin Login
const loginAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield index_1.prismaClient.admin.findUnique({ where: { email } });
    if (!admin) {
        throw new NotFoundException_1.NotFoundException("Admin not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    if (!compareSync(password, admin.password)) {
        throw new BadRequestExpection_1.BadRequestExpection("Incorrect password", root_1.ErrorCode.INCORRECT_PASSWORD);
    }
    const token = jwt.sign({ adminId: admin.id }, secret_1.JWT_SECRET);
    return { admin, token };
});
exports.loginAdmin = loginAdmin;
// Update Admin
const updateAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let admin = yield index_1.prismaClient.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new NotFoundException_1.NotFoundException("Admin not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    admin = yield index_1.prismaClient.admin.update({
        where: { id },
        data,
    });
    return admin;
});
exports.updateAdmin = updateAdmin;
// Get All Admins
const getAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield index_1.prismaClient.admin.findMany();
});
exports.getAllAdmins = getAllAdmins;
// Get Admin by ID
const getAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield index_1.prismaClient.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new NotFoundException_1.NotFoundException("Admin not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    return admin;
});
exports.getAdminById = getAdminById;
// Delete Admin by ID
const deleteAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield index_1.prismaClient.admin.findUnique({ where: { id } });
    if (!admin) {
        throw new NotFoundException_1.NotFoundException("Admin not found", root_1.ErrorCode.USER_NOT_FOUND);
    }
    yield index_1.prismaClient.admin.delete({ where: { id } });
});
exports.deleteAdminById = deleteAdminById;
// Delete All Admins
const deleteAllAdmins = () => __awaiter(void 0, void 0, void 0, function* () {
    yield index_1.prismaClient.admin.deleteMany();
});
exports.deleteAllAdmins = deleteAllAdmins;
