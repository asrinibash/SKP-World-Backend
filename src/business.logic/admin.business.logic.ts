// admin-auth.business.logic.ts
const { hashSync, compareSync } = require("bcrypt");
import * as jwt from "jsonwebtoken";
import { prismaClient } from "../index";
import { JWT_SECRET } from "../secret";
import { ErrorCode } from "../errorHandle/root";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { Admin } from ".prisma/client";

// Admin Signup
export const signupAdmin = async (data: {
  email: string;
  name: string;
  password: string;
  image?: string;
}): Promise<Admin> => {
  const { email, name, password, image } = data;

  try {
    // Check if the admin already exists
    let admin = await prismaClient.admin.findFirst({ where: { email } });
    if (admin) {
      throw new BadRequestExpection(
        "Admin already exists",
        ErrorCode.USER_ALREADY_EXIST
      );
    }

    // Create a new admin with the provided details
    admin = await prismaClient.admin.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        image,
      },
    });

    return admin;
  } catch (error) {
    console.error("Error in signupAdmin:", error);
    throw error;
  }
};

// Admin Login
export const loginAdmin = async (email: string, password: string) => {
  const admin = await prismaClient.admin.findUnique({ where: { email } });

  if (!admin) {
    throw new NotFoundException("Admin not found", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, admin.password)) {
    throw new BadRequestExpection(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign({ adminId: admin.id }, JWT_SECRET);

  return { admin, token };
};

// Update Admin
export const updateAdmin = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  let admin = await prismaClient.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new NotFoundException("Admin not found", ErrorCode.USER_NOT_FOUND);
  }

  admin = await prismaClient.admin.update({
    where: { id },
    data,
  });

  return admin;
};

// Get All Admins
export const getAllAdmins = async (): Promise<Admin[]> => {
  return await prismaClient.admin.findMany();
};

// Get Admin by ID
export const getAdminById = async (id: string): Promise<Admin | null> => {
  const admin = await prismaClient.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new NotFoundException("Admin not found", ErrorCode.USER_NOT_FOUND);
  }

  return admin;
};

// Delete Admin by ID
export const deleteAdminById = async (id: string): Promise<void> => {
  const admin = await prismaClient.admin.findUnique({ where: { id } });

  if (!admin) {
    throw new NotFoundException("Admin not found", ErrorCode.USER_NOT_FOUND);
  }

  await prismaClient.admin.delete({ where: { id } });
};

// Delete All Admins
export const deleteAllAdmins = async (): Promise<void> => {
  await prismaClient.admin.deleteMany();
};

export const uploadAdminImage = async (
  adminId: string,
  imageUrl: string
): Promise<Admin> => {
  // Use the Admin type instead of User
  // Ensure the admin exists
  let admin = await prismaClient.admin.findUnique({ where: { id: adminId } });

  if (!admin) {
    throw new NotFoundException(
      "Admin not found",
      ErrorCode.CATEGORY_ALREADY_EXIST
    );
  }

  // Update the admin with the new image URL and set uploaded to true
  admin = await prismaClient.admin.update({
    where: { id: adminId },
    data: {
      image: imageUrl,
      uploaded: true, // Ensure this field is defined in your Prisma schema
    },
  });

  return admin;
};
