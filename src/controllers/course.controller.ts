// src/controllers/course.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourseById,
  updateCourseFile,
  updateCourseTags,
} from "../business.logic/course.bussiness.logic";

// Create Course
export const createCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = req.adminId; // Ensure admin is authenticated
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const course = await createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// Get All Courses
export const getAllCoursesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// Get Course by ID
export const getCourseByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const course = await getCourseById(id);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Update Course
export const updateCourseController = async (
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
    const course = await updateCourse(id, req.body);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// Delete Course by ID
export const deleteCourseByIdController = async (
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
    await deleteCourseById(id);
    res.status(204).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Update Course File Controller
export const updateCourseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure the admin is authenticated
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Get course ID from params and file from the request body
    const { id } = req.params;
    const { file } = req.body;

    // Update the course file
    const updatedCourse = await updateCourseFile(id, file);

    // Respond with the updated course
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

// Update Course Tags Controller
export const updateCourseTagsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure the admin is authenticated
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Get course ID from params and tags from the request body
    const { id } = req.params;
    const { tags } = req.body;

    // Update the course tags
    const updatedCourse = await updateCourseTags(id, tags);

    // Respond with the updated course
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};
