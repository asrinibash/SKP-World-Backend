"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/signup", user_controller_1.signupUserController);
router.post("/login", user_controller_1.loginUserController);
router.get("/", user_controller_1.getAllUsersController);
router.get("/:id", user_controller_1.getUserByIdController);
router.put("/:id", user_controller_1.updateUserController);
router.delete("/:id", user_controller_1.deleteUserByIdController);
// router.delete("/", deleteAllUsersController);
exports.default = router;
