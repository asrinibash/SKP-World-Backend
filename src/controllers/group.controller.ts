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
  getUsersByGroupId,
} from "../business.logic/group.bussiness.logic";

export const createGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { adminId } = req.params; // Retrieve adminId from the request params

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

// Controller for adding user to group
export const addUserToGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body; // Ensure 'name' exists in the request body
    const { groupId } = req.params; // Group ID from the route parameter

    const userGroup = await addUserToGroup(name, groupId); // Pass name and groupId
    res.status(201).json(userGroup);
  } catch (error: any) {
    if (error.name === "UserAlreadyInGroup") {
      return res.status(409).json({ message: error.message });
    }
    next(error); // For other errors, pass to the error handler middleware
  }
};

export const getUsersByGroupIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { groupId } = req.params; // Get groupId from request parameters
    const users = await getUsersByGroupId(groupId); // Fetch users for the group
    res.status(200).json(users); // Return the list of users
  } catch (error) {
    next(error); // Handle errors in middleware
  }
};

// Remove User from Group Controller
export const removeUserFromGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { groupId } = req.params;
    await removeUserFromGroup(userId, groupId);
    res.status(204).json({ message: "User removed from group successfully" });
  } catch (error) {
    next(error);
  }
};
