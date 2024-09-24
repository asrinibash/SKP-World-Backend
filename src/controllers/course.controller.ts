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
import upload from "../multer/multer.config";
import { prismaClient } from "..";
import { uploadFiles } from "../multer/upload";

// Create Course Controller

// Use multer to handle file uploads for the route
const uploadFile = upload.single("file");

export const createCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  uploadFiles(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err); // Log the multer error
      return res.status(400).json({ message: err.message });
    }

    // Log uploaded files and request body for debugging
    console.log("Uploaded files:", req.files);
    console.log("Request body:", req.body);

    // Extract only the expected fields from req.body
    const { name, description, price, tags, categoryName } = req.body;

    // Check for any unexpected fields
    const unexpectedFields = Object.keys(req.body).filter(
      (key) =>
        !["name", "description", "price", "tags", "categoryName"].includes(key)
    );

    if (unexpectedFields.length > 0) {
      return res.status(400).json({
        message: "Unexpected fields present in the request",
        unexpectedFields: unexpectedFields, // Return the unexpected fields
      });
    }

    try {
      // Check if the admin is authenticated
      const admin = req.adminId;
      if (!admin) {
        return res.status(403).json({ message: "Unauthorized access" });
      }

      // Ensure files are uploaded
      const files = req.files as Express.Multer.File[]; // Typecast to get the file array
      const filePaths = files.map((file) => file.path); // Extract file paths

      // Ensure files were uploaded
      if (!filePaths.length) {
        return res.status(400).json({ message: "File upload failed" });
      }

      // Prepare course data
      const courseData = {
        name,
        description,
        price: parseFloat(price), // Ensure price is a number
        tags: tags.split(","), // Convert tags to an array
        file: filePaths, // Pass the array of file paths
        categoryName, // Ensure categoryName is received
      };

      // Create the course using the service function
      const course = await createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      next(error); // Pass errors to the error handler
    }
  });
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
// Update Course File Controller
export const updateCourseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Extract file paths to save in the database
    const filePaths = files.map((file) => file.path);

    // Pass the entire filePaths array to the update function
    const updatedCourse = await updateCourseFile(id, filePaths);

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
