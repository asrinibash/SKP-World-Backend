import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} from "../business.logic/category.business.logic";

// Create Category
export const createCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure admin is authenticated
    const admin = req.adminId; // Assuming admin is attached to the request by auth middleware
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Get All Categories
export const getAllCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Get Category by ID
export const getCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Update Category
export const updateCategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure admin is authenticated
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;
    const category = await updateCategory(id, req.body);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete Category by ID
export const deleteCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure admin is authenticated
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;
    await deleteCategoryById(id);
    res.status(204).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
