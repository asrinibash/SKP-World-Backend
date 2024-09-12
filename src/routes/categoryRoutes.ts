// routes/category-routes.ts
import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryByIdController,
} from "../controllers/category.controller";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";

const router = Router();

router.post("/create", adminAuthMiddleware, createCategoryController);
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);
router.put("/:id", adminAuthMiddleware, updateCategoryController);
router.delete("/:id", adminAuthMiddleware, deleteCategoryByIdController);

export default router;
