const { hashSync, compareSync } = require("bcrypt"); // Import your Prisma client
import { User } from "@prisma/client"; // Import User model from Prisma
import { prismaClient } from "../index";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret"; // Replace with your actual secret key location
import { ErrorCode } from "../errorHandle/root";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";

// User Signup
export const signupUser = async (data: {
  email: string;
  name: string;
  password: string;
  image?: string;
}): Promise<User> => {
  const { email, name, password, image } = data;

  // Check if the user already exists
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestExpection(
      "User already exists",
      ErrorCode.USER_ALREADY_EXIST
    );
  }

  // Create a new user with default values for fields not provided
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      image,
      uploaded: false,
      purchasedCourses: {
        create: [], // Properly initializing with nested create input type
      },
      downloadHistory: null, // Can be set to null
      userGroups: {
        create: [], // Properly initializing with nested create input type
      },
      orders: {
        create: [], // Properly initializing with nested create input type
      },
      // Omit the subscription field
    },
  });

  return user;
};

// User Login
export const loginUser = async (email: string, password: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestExpection(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return { user, token };
};

// Update User
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  let user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  user = await prismaClient.user.update({
    where: { id },
    data,
  });

  return user;
};

// Get All Users
export const getAllUsers = async (): Promise<User[]> => {
  return await prismaClient.user.findMany();
};

// Get User by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  return user;
};

// Delete User by ID
export const deleteUserById = async (id: string): Promise<void> => {
  const user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  await prismaClient.user.delete({ where: { id } });
};

// Delete All Users
export const deleteAllUsers = async (): Promise<void> => {
  await prismaClient.user.deleteMany();
};
