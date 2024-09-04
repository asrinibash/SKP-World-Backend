import { Request, Response, NextFunction } from "express";
import {
  signupAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
} from "../business.logic/Admin-business.logic";

export const signupAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await signupAdmin(req.body);
    res.status(201).json(admin);
  } catch (error) {
    next(error);
  }
};

export const loginAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { admin, token } = await loginAdmin(email, password);
    res.status(200).json({ admin, token });
  } catch (error) {
    next(error);
  }
};

export const getAllAdminsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admins = await getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    next(error);
  }
};

export const getAdminByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const admin = await getAdminById(id);
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

export const updateAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const admin = await updateAdmin(id, req.body);
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

export const deleteAdminByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await deleteAdminById(id);
    res.status(204).json({ message: "Admin deleted successfully", id: id });
  } catch (error) {
    next(error);
  }
};

export const deleteAllAdminsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllAdmins();
    res.status(204).send("All admins deleted successfully");
  } catch (error) {
    next(error);
  }
};
