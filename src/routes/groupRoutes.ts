// src/routes/group.routes.ts
import { Router } from "express";
import {
  createGroupController,
  getAllGroupsController,
  getGroupByIdController,
  updateGroupController,
  deleteGroupByIdController,
  addUserToGroupController,
  removeUserFromGroupController,
} from "../controllers/group.controller";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";

const router = Router();

// Routes
router.post("/:adminId", adminAuthMiddleware, createGroupController);
router.get("/", getAllGroupsController);
router.get("/:id", getGroupByIdController);
router.put("/:id", adminAuthMiddleware, updateGroupController);
router.delete("/:id", adminAuthMiddleware, deleteGroupByIdController);
router.post("/addUser/:groupId/users", addUserToGroupController);
router.delete("/removeUser/:groupId/users", removeUserFromGroupController);

export default router;
