import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { ErrorCode } from "../errorHandle/root";
import { prismaClient } from "../index";
import { Course } from ".prisma/client";
import { uploadFile as s3UploadFile, getSignedDownloadUrl } from "../utils/s3";
import archiver from "archiver";
import { Readable } from "stream";

// courseService.ts

export const createCourse = async (data: {
  name: string;
  description: string;
  price: number;
  tags: string[];
  file: string[]; // Array of file paths
  categoryName: string;
}): Promise<Course> => {
  const { name, description, price, tags, file, categoryName } = data;

  try {
    // Check if the course with the same name already exists
    const existingCourse = await prismaClient.course.findFirst({
      where: { name },
    });

    if (existingCourse) {
      throw new BadRequestExpection(
        "Course already exists",
        ErrorCode.COURSE_ALREADY_EXIST
      );
    }

    // Validate if the provided categoryName exists in the Category collection
    const categoryExists = await prismaClient.category.findUnique({
      where: { name: categoryName },
    });

    if (!categoryExists) {
      throw new BadRequestExpection(
        "Invalid category name. Category not found",
        ErrorCode.CATEGORY_NOT_FOUND
      );
    }

    // Create a new course with the validated details
    const course = await prismaClient.course.create({
      data: {
        name,
        description,
        price,
        tags,
        file, // Store the array of file paths
        categoryId: categoryExists.id, // Use the ID of the found category
      },
    });

    return course;
  } catch (error) {
    console.error("Error in createCourse:", error);
    throw error;
  }
};

export const getAllCourses = async (): Promise<Course[]> => {
  return await prismaClient.course.findMany({
    include: {
      category: true,
      purchases: true, // Ensure this relation is correct
      orders: true,
    },
  });
};

// Get Course by ID
export const getCourseById = async (id: string): Promise<Course | null> => {
  const course = await prismaClient.course.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  return course;
};

// Update Course
export const updateCourse = async (
  id: string,
  data: Partial<Course>
): Promise<Course> => {
  let course = await prismaClient.course.findUnique({ where: { id } });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  course = await prismaClient.course.update({
    where: { id },
    data,
  });

  return course;
};

// Delete Course by ID
export const deleteCourseById = async (id: string): Promise<void> => {
  const course = await prismaClient.course.findUnique({ where: { id } });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  await prismaClient.course.delete({ where: { id } });
};

// Update Course File Service
// Update Course File Service
export const updateCourseFile = async (
  id: string,
  files: string[] // This should accept an array of strings
): Promise<Course> => {
  // Find course by ID
  const course = await prismaClient.course.findUnique({ where: { id } });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  // Update the course file with the array of file paths
  return await prismaClient.course.update({
    where: { id },
    data: { file: files }, // Pass the files array directly
  });
};

// Update Course Tags Service
export const updateCourseTags = async (
  id: string,
  tags: string[]
): Promise<Course> => {
  // Find course by ID
  const course = await prismaClient.course.findUnique({ where: { id } });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  // Update the course tags
  return await prismaClient.course.update({
    where: { id },
    data: { tags },
  });
};

// New function for getting course file
export const getCourseFile = async (id: string): Promise<string[]> => {
  const course = await getCourseById(id);

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  // Assuming the course.file is an array of S3 keys
  return await Promise.all(course.file.map((key) => getSignedDownloadUrl(key)));
};

// New function for downloading course PDFs
export const downloadCoursePDFs = async (
  courseId: string,
  userId: string
): Promise<archiver.Archiver> => {
  const purchase = await prismaClient.purchase.findFirst({
    where: {
      userId: userId,
      courseId: courseId,
    },
  });

  if (!purchase) {
    throw new BadRequestExpection(
      "Access denied. Course not purchased.",
      ErrorCode.UNAUTHORIZED
    );
  }

  const course = await prismaClient.course.findUnique({
    where: { id: courseId },
    select: { pdfKeys: true },
  });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  const archive = archiver("zip");

  for (const pdfKey of course.pdfKeys) {
    const pdfName = pdfKey.split("/").pop();
    const signedUrl = await getSignedDownloadUrl(pdfKey);
    const response = await fetch(signedUrl);
    const pdfStream = response.body;
    if (pdfStream) {
      archive.append(pdfStream as unknown as Readable, { name: pdfName });
    }
  }

  return archive;
};

// New function for uploading course files
export const uploadCourseFiles = async (
  files: Express.Multer.File[]
): Promise<string[]> => {
  if (!files || files.length === 0) {
    throw new BadRequestExpection("No files uploaded", ErrorCode.BAD_REQUEST);
  }

  return await Promise.all(
    files.map(async (file) => {
      const key = `courses/${Date.now()}-${file.originalname}`;
      return await s3UploadFile(file, key);
    })
  );
};
