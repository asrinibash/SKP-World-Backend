// src/routes/course.routes.ts
import { Router } from "express";
import {
  createCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseByIdController,
  updateCourseFileController,
  updateCourseTagsController,
} from "../controllers/course.controller";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import upload from "../multer/upload";

const router = Router();

router.post(
  "/create",
  adminAuthMiddleware,
  upload.single("file"),
  createCourseController
);
router.get("/", getAllCoursesController);
router.get("/:id", getCourseByIdController);
router.put("/:id", adminAuthMiddleware, updateCourseController);
router.delete("/:id", adminAuthMiddleware, deleteCourseByIdController);
router.patch("/:id/file", adminAuthMiddleware, updateCourseFileController);
router.patch("/:id/tags", adminAuthMiddleware, updateCourseTagsController);

export default router;
