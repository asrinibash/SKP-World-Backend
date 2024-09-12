"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const adminRoutes = (0, express_1.Router)();
adminRoutes.post("/signup", admin_controller_1.signupAdminController);
adminRoutes.post("/login", admin_controller_1.loginAdminController);
adminRoutes.get("/", admin_controller_1.getAllAdminsController);
adminRoutes.get("/:id", admin_controller_1.getAdminByIdController);
adminRoutes.put("/:id", admin_controller_1.updateAdminController);
adminRoutes.delete("/:id", admin_controller_1.deleteAdminByIdController);
// adminRoutes.delete("/", deleteAllAdminsController);   // for testing purposes
exports.default = adminRoutes;
