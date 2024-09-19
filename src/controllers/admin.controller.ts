import { Request, Response, NextFunction } from "express";
import {
  signupAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdminById,
  deleteAllAdmins,
  uploadAdminImage,
} from "../business.logic/admin.business.logic";

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

export const uploadAdminImageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminId = req.params.adminId;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded file:", req.file); // Log file details
    console.log("Admin ID:", adminId); // Log admin ID

    const imageUrl = `http://localhost:8080/uploads/${req.file.filename}`;
    console.log("Image URL:", imageUrl); // Log image URL

    // Call business logic to update the admin
    const admin = await uploadAdminImage(adminId, imageUrl);
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};
