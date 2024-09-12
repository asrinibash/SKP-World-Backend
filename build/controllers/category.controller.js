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
exports.deleteCategoryByIdController = exports.updateCategoryController = exports.getCategoryByIdController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const category_business_logic_1 = require("../business.logic/category.business.logic");
// Create Category
const createCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure admin is authenticated
        const admin = req.adminId; // Assuming admin is attached to the request by auth middleware
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const category = yield (0, category_business_logic_1.createCategory)(req.body);
        res.status(201).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.createCategoryController = createCategoryController;
// Get All Categories
const getAllCategoriesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_business_logic_1.getAllCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategoriesController = getAllCategoriesController;
// Get Category by ID
const getCategoryByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield (0, category_business_logic_1.getCategoryById)(id);
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoryByIdController = getCategoryByIdController;
// Update Category
const updateCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure admin is authenticated
        const admin = req.adminId;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const { id } = req.params;
        const category = yield (0, category_business_logic_1.updateCategory)(id, req.body);
        res.status(200).json(category);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategoryController = updateCategoryController;
// Delete Category by ID
const deleteCategoryByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure admin is authenticated
        const admin = req.adminId;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const { id } = req.params;
        yield (0, category_business_logic_1.deleteCategoryById)(id);
        res.status(204).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategoryByIdController = deleteCategoryByIdController;
