"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/category-routes.ts
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const router = (0, express_1.Router)();
router.post("/create", adminAuthMiddleware_1.authenticateAdmin, category_controller_1.createCategoryController);
router.get("/", category_controller_1.getAllCategoriesController);
router.get("/:id", category_controller_1.getCategoryByIdController);
router.put("/:id", adminAuthMiddleware_1.authenticateAdmin, category_controller_1.updateCategoryController);
router.delete("/:id", adminAuthMiddleware_1.authenticateAdmin, category_controller_1.deleteCategoryByIdController);
exports.default = router;
