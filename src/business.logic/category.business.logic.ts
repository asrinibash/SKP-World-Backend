import { prismaClient } from "../index";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { Category } from ".prisma/client";
import { ErrorCode } from "../errorHandle/root";

// Create Category
export const createCategory = async (data: {
  name: string;
  description: string;
  image?: string;
}): Promise<Category> => {
  const { name, description, image } = data;

  try {
    // Check if the category already exists
    const existingCategory = await prismaClient.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      throw new BadRequestExpection(
        "Category already exists",
        ErrorCode.CATEGORY_ALREADY_EXIST
      );
    }

    // Create a new category with the provided details
    const category = await prismaClient.category.create({
      data: {
        name,
        description,
        image,
      },
    });

    return category;
  } catch (error) {
    console.error("Error in createCategory:", error);
    throw error;
  }
};

// Get All Categories
export const getAllCategories = async (): Promise<Category[]> => {
  return await prismaClient.category.findMany();
};

// Get Category by ID
export const getCategoryById = async (id: string): Promise<Category | null> => {
  const category = await prismaClient.category.findUnique({ where: { id } });

  if (!category) {
    throw new NotFoundException("Category not found", ErrorCode.CATEGORY_NOT_FOUND);
  }

  return category;
};

// Update Category
export const updateCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category> => {
  let category = await prismaClient.category.findUnique({ where: { id } });

  if (!category) {
    throw new NotFoundException("Category not found", ErrorCode.CATEGORY_NOT_FOUND);
  }

  category = await prismaClient.category.update({
    where: { id },
    data,
  });

  return category;
};

// Delete Category by ID
export const deleteCategoryById = async (id: string): Promise<void> => {
  const category = await prismaClient.category.findUnique({ where: { id } });

  if (!category) {
    throw new NotFoundException("Category not found", ErrorCode.CATEGORY_NOT_FOUND);
  }

  await prismaClient.category.delete({ where: { id } });
};
