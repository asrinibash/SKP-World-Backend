"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/course.routes.ts
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const router = (0, express_1.Router)();
router.post("/create", adminAuthMiddleware_1.authenticateAdmin, course_controller_1.createCourseController);
router.get("/", course_controller_1.getAllCoursesController);
router.get("/:id", course_controller_1.getCourseByIdController);
router.put("/:id", adminAuthMiddleware_1.authenticateAdmin, course_controller_1.updateCourseController);
router.delete("/:id", adminAuthMiddleware_1.authenticateAdmin, course_controller_1.deleteCourseByIdController);
router.patch("/:id/file", adminAuthMiddleware_1.authenticateAdmin, course_controller_1.updateCourseFileController);
router.patch("/:id/tags", adminAuthMiddleware_1.authenticateAdmin, course_controller_1.updateCourseTagsController);
exports.default = router;
