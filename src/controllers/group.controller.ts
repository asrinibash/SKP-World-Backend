// src/controllers/group.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroupById,
  addUserToGroup,
  removeUserFromGroup,
} from "../business.logic/group.bussiness.logic";

export const createGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminId = req.adminId; // Retrieve adminId from the request context

    if (!adminId) {
      return res.status(400).json({ error: "Admin ID is required." });
    }

    const group = await createGroup({
      name: req.body.name,
      description: req.body.description,
      adminId, // Pass adminId to the createGroup function
    });

    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
};

// Get All Groups
export const getAllGroupsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const groups = await getAllGroups();
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};

// Get Group by ID
export const getGroupByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const group = await getGroupById(id);
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

// Update Group
export const updateGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;
    const group = await updateGroup(id, req.body);
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

// Delete Group by ID
export const deleteGroupByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const { id } = req.params;
    await deleteGroupById(id);
    res.status(204).json({ message: "Group deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addUserToGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body; // Make sure the body contains 'name'
    const { groupId } = req.params; // Group ID from the route parameter

    const userGroup = await addUserToGroup(name, groupId); // Pass name and groupId
    res.status(201).json(userGroup);
  } catch (error) {
    next(error);
  }
};

// Remove User from Group Controller
export const removeUserFromGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const { groupId } = req.params;
    await removeUserFromGroup(userId, groupId);
    res.status(204).json({ message: "User removed from group successfully" });
  } catch (error) {
    next(error);
  }
};
