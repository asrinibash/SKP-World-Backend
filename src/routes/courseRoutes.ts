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
  getCourseFileController,
  downloadCoursePDFsController,
} from "../controllers/course.controller";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware";
import { purchaseCheckMiddleware } from "../middleware/purchaseCheckMiddleware";
import upload from "../multer/multer.config";

const router = Router();

// Public routes
router.get("/getAll", getAllCoursesController);
router.get("/:courseId", getCourseByIdController);

// User authenticated and purchase-checked routes
router.get(
  "/:courseId/file",
  userAuthMiddleware,
  purchaseCheckMiddleware,
  getCourseFileController
);
router.get(
  "/:courseId/download-pdfs",
  userAuthMiddleware,
  purchaseCheckMiddleware,
  downloadCoursePDFsController
);

// Admin authenticated routes
router.post(
  "/create",
  adminAuthMiddleware,
  upload.array("files"),
  createCourseController
);
router.put("/:courseId", adminAuthMiddleware, updateCourseController);
router.delete("/:courseId", adminAuthMiddleware, deleteCourseByIdController);
router.patch(
  "/:courseId/file",
  adminAuthMiddleware,
  upload.array("files"),
  updateCourseFileController
);
router.patch("/:courseId/tags", adminAuthMiddleware, updateCourseTagsController);

export default router;
