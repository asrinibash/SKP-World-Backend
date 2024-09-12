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
exports.deleteCategoryById = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const index_1 = require("../index");
const NotFoundException_1 = require("../errorHandle/NotFoundException");
const BadRequestExpection_1 = require("../errorHandle/BadRequestExpection");
const root_1 = require("../errorHandle/root");
// Create Category
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, image } = data;
    try {
        // Check if the category already exists
        const existingCategory = yield index_1.prismaClient.category.findFirst({
            where: { name },
        });
        if (existingCategory) {
            throw new BadRequestExpection_1.BadRequestExpection("Category already exists", root_1.ErrorCode.CATEGORY_ALREADY_EXIST);
        }
        // Create a new category with the provided details
        const category = yield index_1.prismaClient.category.create({
            data: {
                name,
                description,
                image,
            },
        });
        return category;
    }
    catch (error) {
        console.error("Error in createCategory:", error);
        throw error;
    }
});
exports.createCategory = createCategory;
// Get All Categories
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield index_1.prismaClient.category.findMany();
});
exports.getAllCategories = getAllCategories;
// Get Category by ID
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield index_1.prismaClient.category.findUnique({ where: { id } });
    if (!category) {
        throw new NotFoundException_1.NotFoundException("Category not found", root_1.ErrorCode.CATEGORY_NOT_FOUND);
    }
    return category;
});
exports.getCategoryById = getCategoryById;
// Update Category
const updateCategory = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let category = yield index_1.prismaClient.category.findUnique({ where: { id } });
    if (!category) {
        throw new NotFoundException_1.NotFoundException("Category not found", root_1.ErrorCode.CATEGORY_NOT_FOUND);
    }
    category = yield index_1.prismaClient.category.update({
        where: { id },
        data,
    });
    return category;
});
exports.updateCategory = updateCategory;
// Delete Category by ID
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield index_1.prismaClient.category.findUnique({ where: { id } });
    if (!category) {
        throw new NotFoundException_1.NotFoundException("Category not found", root_1.ErrorCode.CATEGORY_NOT_FOUND);
    }
    yield index_1.prismaClient.category.delete({ where: { id } });
});
exports.deleteCategoryById = deleteCategoryById;
