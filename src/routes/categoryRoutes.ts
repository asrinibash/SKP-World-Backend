// routes/category-routes.ts
import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryByIdController,
} from "../controllers/category.controller";
import { authenticateAdmin } from "../middleware/adminAuthMiddleware";

const router = Router();

router.post("/create", authenticateAdmin, createCategoryController);
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);
router.put("/:id", authenticateAdmin, updateCategoryController);
router.delete("/:id", authenticateAdmin, deleteCategoryByIdController);

export default router;
