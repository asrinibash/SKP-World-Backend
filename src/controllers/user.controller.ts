import { Request, Response, NextFunction } from "express";
import {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
  deleteAllUsers,
  uploadImage,
  getUsersByStatus,
  updateUserStatusById,
} from "../business.logic/user.business.logic";
import { prismaClient } from "..";
import { UserStatus } from "@prisma/client";

// User Signup
export const signupUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// User Login Controller
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

// Get All Users
export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get User by ID
export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update User
export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete User by ID
export const deleteUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);
    res.status(204).json({ message: "User deleted successfully", id });
  } catch (error) {
    next(error);
  }
};

// Delete All Users
export const deleteAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllUsers();
    res.status(204).send("All users deleted successfully");
  } catch (error) {
    next(error);
  }
};

// Upload Image Controller
export const uploadImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded file:", req.file); // Log file details
    console.log("User ID:", userId); // Log user ID

    const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
    console.log("Image URL:", imageUrl); // Log image URL

    // Call business logic to update the user
    const user = await uploadImage(userId, imageUrl);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// Update User Status Controller

// Update User Status Controller
// userController.ts

export const updateUserStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userStatus } = req.body;

    console.log("User ID:", id);
    console.log("User Status from request:", userStatus);

    // Validate userStatus against UserStatus enum values
    if (!Object.values(UserStatus).includes(userStatus)) {
      return res.status(400).json({ message: "Invalid user status" });
    }

    const updatedUser = await updateUserStatusById(id, userStatus);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

//Users by Status Controller
export const getUsersByStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params; // Get userId from request parameters

    // Retrieve user by ID to get the status
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { status: true }, // Only select the status field
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get users by the retrieved status
    const users = await getUsersByStatus(user.status);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
