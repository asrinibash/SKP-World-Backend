import { prismaClient } from "../index";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { Course } from ".prisma/client";
import { ErrorCode } from "../errorHandle/root";


export const createCourse = async (data: {
  name: string;
  description: string;
  price: number;
  tags: string[];
  file: string;
  categoryId: string;
}): Promise<Course> => {
  const { name, description, price, tags, file, categoryId } = data;

  try {
    const existingCourse = await prismaClient.course.findFirst({
      where: { name },
    });

    if (existingCourse) {
      throw new BadRequestExpection(
        "Course already exists",
        ErrorCode.COURSE_ALREADY_EXIST
      );
    }

    // Create a new course with the provided details
    const course = await prismaClient.course.create({
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
  } catch (error) {
    console.error("Error in createCourse:", error);
    throw error;
  }
};

// Get All Courses
export const getAllCourses = async (): Promise<Course[]> => {
  return await prismaClient.course.findMany({
    include: {
      category: true,
      purchasedCourses: true,
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

// Update Course File
export const updateCourseFile = async (
  id: string,
  file: string
): Promise<Course> => {
  const course = await prismaClient.course.findUnique({ where: { id } });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  return await prismaClient.course.update({
    where: { id },
    data: { file },
  });
};

// Update Course Tags
export const updateCourseTags = async (
  id: string,
  tags: string[]
): Promise<Course> => {
  const course = await prismaClient.course.findUnique({ where: { id } });

  if (!course) {
    throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
  }

  return await prismaClient.course.update({
    where: { id },
    data: { tags },
  });
};
