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
  getUsersByGroupIdController,
  addCourseInGroupController,
  getCoursesByGroupIdController,
} from "../controllers/group.controller";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";

const router = Router();

// Routes
// router.post("/", adminAuthMiddleware, createGroupController);
// router.get("/getAll", getAllGroupsController);

router.post("/:adminId", createGroupController);
// router.post("/:adminId", adminAuthMiddleware, createGroupController);
router.get("/getAll", getAllGroupsController);
router.get("/:id", getGroupByIdController);
router.put("/:id", adminAuthMiddleware, updateGroupController);
router.delete("/:id", adminAuthMiddleware, deleteGroupByIdController);
router.post("/addUser/:groupId/users", addUserToGroupController);
router.post("/addCourse/:groupId/courses", addCourseInGroupController);
router.get("/getAllGroupUser/:groupId", getUsersByGroupIdController);
// Route to fetch courses by category ID
router.get("/getAllGroupCourse/:groupId", getCoursesByGroupIdController);
router.delete(
  "/removeUser/:groupId/users/:userId",
  removeUserFromGroupController
);

export default router;
