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
exports.updateCourseTags = exports.updateCourseFile = exports.deleteCourseById = exports.updateCourse = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
const index_1 = require("../index");
const NotFoundException_1 = require("../errorHandle/NotFoundException");
const BadRequestExpection_1 = require("../errorHandle/BadRequestExpection");
const root_1 = require("../errorHandle/root");
const createCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, tags, file, categoryId } = data;
    try {
        const existingCourse = yield index_1.prismaClient.course.findFirst({
            where: { name },
        });
        if (existingCourse) {
            throw new BadRequestExpection_1.BadRequestExpection("Course already exists", root_1.ErrorCode.COURSE_ALREADY_EXIST);
        }
        // Create a new course with the provided details
        const course = yield index_1.prismaClient.course.create({
            data: {
                name,
                description,
                price,
                tags,
                file,
                categoryId,
            },
        });
        return course;
    }
    catch (error) {
        console.error("Error in createCourse:", error);
        throw error;
    }
});
exports.createCourse = createCourse;
// Get All Courses
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield index_1.prismaClient.course.findMany({
        include: {
            category: true,
            purchasedCourses: true,
            orders: true,
        },
    });
});
exports.getAllCourses = getAllCourses;
// Get Course by ID
const getCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield index_1.prismaClient.course.findUnique({
        where: { id },
        include: { category: true },
    });
    if (!course) {
        throw new NotFoundException_1.NotFoundException("Course not found", root_1.ErrorCode.COURSE_NOT_FOUND);
    }
    return course;
});
exports.getCourseById = getCourseById;
// Update Course
const updateCourse = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    let course = yield index_1.prismaClient.course.findUnique({ where: { id } });
    if (!course) {
        throw new NotFoundException_1.NotFoundException("Course not found", root_1.ErrorCode.COURSE_NOT_FOUND);
    }
    course = yield index_1.prismaClient.course.update({
        where: { id },
        data,
    });
    return course;
});
exports.updateCourse = updateCourse;
// Delete Course by ID
const deleteCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield index_1.prismaClient.course.findUnique({ where: { id } });
    if (!course) {
        throw new NotFoundException_1.NotFoundException("Course not found", root_1.ErrorCode.COURSE_NOT_FOUND);
    }
    yield index_1.prismaClient.course.delete({ where: { id } });
});
exports.deleteCourseById = deleteCourseById;
// Update Course File
const updateCourseFile = (id, file) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield index_1.prismaClient.course.findUnique({ where: { id } });
    if (!course) {
        throw new NotFoundException_1.NotFoundException("Course not found", root_1.ErrorCode.COURSE_NOT_FOUND);
    }
    return yield index_1.prismaClient.course.update({
        where: { id },
        data: { file },
    });
});
exports.updateCourseFile = updateCourseFile;
// Update Course Tags
const updateCourseTags = (id, tags) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield index_1.prismaClient.course.findUnique({ where: { id } });
    if (!course) {
        throw new NotFoundException_1.NotFoundException("Course not found", root_1.ErrorCode.COURSE_NOT_FOUND);
    }
    return yield index_1.prismaClient.course.update({
        where: { id },
        data: { tags },
    });
});
exports.updateCourseTags = updateCourseTags;
