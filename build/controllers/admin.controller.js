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
exports.deleteAllAdminsController = exports.deleteAdminByIdController = exports.updateAdminController = exports.getAdminByIdController = exports.getAllAdminsController = exports.loginAdminController = exports.signupAdminController = void 0;
const admin_business_logic_1 = require("../business.logic/admin.business.logic");
const signupAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield (0, admin_business_logic_1.signupAdmin)(req.body);
        res.status(201).json(admin);
    }
    catch (error) {
        next(error);
    }
});
exports.signupAdminController = signupAdminController;
const loginAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { admin, token } = yield (0, admin_business_logic_1.loginAdmin)(email, password);
        res.status(200).json({ admin, token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginAdminController = loginAdminController;
const getAllAdminsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, admin_business_logic_1.getAllAdmins)();
        res.status(200).json(admins);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllAdminsController = getAllAdminsController;
const getAdminByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield (0, admin_business_logic_1.getAdminById)(id);
        res.status(200).json(admin);
    }
    catch (error) {
        next(error);
    }
});
exports.getAdminByIdController = getAdminByIdController;
const updateAdminController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const admin = yield (0, admin_business_logic_1.updateAdmin)(id, req.body);
        res.status(200).json(admin);
    }
    catch (error) {
        next(error);
    }
});
exports.updateAdminController = updateAdminController;
const deleteAdminByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, admin_business_logic_1.deleteAdminById)(id);
        res.status(204).json({ message: "Admin deleted successfully", id: id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAdminByIdController = deleteAdminByIdController;
const deleteAllAdminsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, admin_business_logic_1.deleteAllAdmins)();
        res.status(204).send("All admins deleted successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAllAdminsController = deleteAllAdminsController;
