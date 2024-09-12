import { Request, Response, NextFunction } from "express";
import {
  signupUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
  deleteAllUsers,
} from "../business.logic/user.business.logic";

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

// User Login
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
