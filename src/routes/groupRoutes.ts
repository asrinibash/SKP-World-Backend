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
router.post("/", adminAuthMiddleware, createGroupController);
router.get("/getAll", getAllGroupsController);
router.get("/:id", getGroupByIdController);
router.put("/:id", adminAuthMiddleware, updateGroupController);
router.delete("/:id", adminAuthMiddleware, deleteGroupByIdController);
router.post("/addUser", addUserToGroupController);
router.post("/removeUser", removeUserFromGroupController);

export default router;
