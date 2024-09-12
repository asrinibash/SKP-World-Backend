"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseTagsController = exports.updateCourseFileController = exports.deleteCourseByIdController = exports.updateCourseController = exports.getCourseByIdController = exports.getAllCoursesController = exports.createCourseController = void 0;
const course_bussiness_logic_1 = require("../business.logic/course.bussiness.logic");
// Create Course
const createCourseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.adminId; // Ensure admin is authenticated
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const course = yield (0, course_bussiness_logic_1.createCourse)(req.body);
        res.status(201).json(course);
    }
    catch (error) {
        next(error);
    }
});
exports.createCourseController = createCourseController;
// Get All Courses
const getAllCoursesController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, course_bussiness_logic_1.getAllCourses)();
        res.status(200).json(courses);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCoursesController = getAllCoursesController;
// Get Course by ID
const getCourseByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield (0, course_bussiness_logic_1.getCourseById)(id);
        res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
});
exports.getCourseByIdController = getCourseByIdController;
// Update Course
const updateCourseController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.adminId;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const { id } = req.params;
        const course = yield (0, course_bussiness_logic_1.updateCourse)(id, req.body);
        res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCourseController = updateCourseController;
// Delete Course by ID
const deleteCourseByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.adminId;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const { id } = req.params;
        yield (0, course_bussiness_logic_1.deleteCourseById)(id);
        res.status(204).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCourseByIdController = deleteCourseByIdController;
// Update Course File
const updateCourseFileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.adminId;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const { id } = req.params;
        const { file } = req.body;
        const course = yield (0, course_bussiness_logic_1.updateCourseFile)(id, file);
        res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCourseFileController = updateCourseFileController;
// Update Course Tags
const updateCourseTagsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.adminId;
        if (!admin) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const { id } = req.params;
        const { tags } = req.body;
        const course = yield (0, course_bussiness_logic_1.updateCourseTags)(id, tags);
        res.status(200).json(course);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCourseTagsController = updateCourseTagsController;
