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
exports.deleteAllUsersController = exports.deleteUserByIdController = exports.updateUserController = exports.getUserByIdController = exports.getAllUsersController = exports.loginUserController = exports.signupUserController = void 0;
const user_business_logic_1 = require("../business.logic/user.business.logic");
// User Signup
const signupUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_business_logic_1.signupUser)(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.signupUserController = signupUserController;
// User Login
const loginUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { user, token } = yield (0, user_business_logic_1.loginUser)(email, password);
        res.status(200).json({ user, token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUserController = loginUserController;
// Get All Users
const getAllUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_business_logic_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsersController = getAllUsersController;
// Get User by ID
const getUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_business_logic_1.getUserById)(id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserByIdController = getUserByIdController;
// Update User
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield (0, user_business_logic_1.updateUser)(id, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserController = updateUserController;
// Delete User by ID
const deleteUserByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, user_business_logic_1.deleteUserById)(id);
        res.status(204).json({ message: "User deleted successfully", id });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserByIdController = deleteUserByIdController;
// Delete All Users
const deleteAllUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_business_logic_1.deleteAllUsers)();
        res.status(204).send("All users deleted successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAllUsersController = deleteAllUsersController;
