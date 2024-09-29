import { Request, Response, NextFunction } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourseById,
  updateCourseFile,
  updateCourseTags,
  getCourseFile,
  downloadCoursePDFs,
  uploadCourseFiles,
} from "../business.logic/course.bussiness.logic";
import upload from "../multer/multer.config";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../types/AuthRequest";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";

// Create Course Controller

// Use multer to handle file uploads for the route

export const createCourseController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if the admin is authenticated
    const admin = req.adminId;
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

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
        unexpectedFields: unexpectedFields,
      });
    }

    // Ensure files are uploaded
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Upload files to S3 and get their URLs
    const fileUrls = await uploadCourseFiles(files);

    // Prepare course data
    const courseData = {
      name,
      description,
      price: parseFloat(price),
      tags: tags.split(","),
      file: fileUrls,
      categoryName,
    };

    // Create the course using the service function
    const course = await createCourse(courseData);
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
// Update Course File Controller
export const updateCourseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const fileUrls = await uploadCourseFiles(
      req.files as Express.Multer.File[]
    );
    const updatedCourse = await updateCourseFile(id, fileUrls);
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
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

// Add this new controller for getting course file
export const getCourseFileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const signedUrls = await getCourseFile(id);
    res.status(200).json({ downloadUrls: signedUrls });
  } catch (error) {
    next(error);
  }
};

// Download Course PDFs

export const downloadCoursePDFsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id; // Assuming AuthRequest adds user info

    const archive = await downloadCoursePDFs(courseId, userId);

    res.attachment(`course_${courseId}_pdfs.zip`);
    archive.pipe(res);
    await archive.finalize();
  } catch (error) {
    console.error("Error downloading course PDFs:", error);
    if (
      error instanceof BadRequestExpection ||
      error instanceof NotFoundException
    ) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.status(500).json({ message: "Error downloading course PDFs" });
  }
};
