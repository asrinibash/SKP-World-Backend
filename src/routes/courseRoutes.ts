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
// import { purchaseCheckMiddleware } from "../middleware/purchaseCheckMiddleware";
import upload from "../multer/multer.config";

const router = Router();

// Public routes
router.get("/getAll", getAllCoursesController);
router.get("/:id", getCourseByIdController);

// User authenticated and purchase-checked routes
router.get(
  "/:id/file",
  userAuthMiddleware,
  // purchaseCheckMiddleware,
  getCourseFileController
);
router.get("/:id/download-pdfs", downloadCoursePDFsController);

// Admin authenticated routes
router.post(
  "/create",
  adminAuthMiddleware,
  upload.array("files"),
  createCourseController
);
router.put("/:id", adminAuthMiddleware, updateCourseController);
router.delete("/:id", adminAuthMiddleware, deleteCourseByIdController);
router.patch(
  "/:id/file",
  adminAuthMiddleware,
  upload.array("files"),
  updateCourseFileController
);
router.patch("/:id/tags", adminAuthMiddleware, updateCourseTagsController);

export default router;
