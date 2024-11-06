// src/business.logic/group.bussiness.logic.ts
import { NotFoundException } from "../errorHandle/NotFoundException";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { Group, User, UserGroup, CourseGroup } from ".prisma/client";
import { ErrorCode } from "../errorHandle/root";
import { Course } from "@prisma/client"; // Import the Course model

// Create Group
import { PrismaClient } from "@prisma/client"; // Adjust the import as necessary

const prismaClient = new PrismaClient();

export const createGroup = async (data: {
  name: string;
  description: string;
  adminId: string; // Add adminId to the input data type
}): Promise<Group> => {
  const { name, description, adminId } = data; // Destructure adminId

  try {
    // Check if the group already exists
    const existingGroup = await prismaClient.group.findFirst({
      where: { name },
    });

    if (existingGroup) {
      throw new BadRequestExpection(
        "Group already exists",
        ErrorCode.GROUP_ALREADY_EXIST
      );
    }

    // Create a new group with the provided details
    const group = await prismaClient.group.create({
      data: {
        name,
        description,
        createdBy: { connect: { id: adminId } }, // Include adminId here
      },
    });

    return group;
  } catch (error) {
    console.error("Error in createGroup:", error);
    throw error;
  }
};

// Get All Groups
export const getAllGroups = async (): Promise<Group[]> => {
  return await prismaClient.group.findMany({
    include: {
      userGroups: true,
      courseGroups: true,
    },
  });
};

// Get Group by ID
export const getGroupById = async (id: string): Promise<Group | null> => {
  const group = await prismaClient.group.findUnique({
    where: { id },
    include: { userGroups: true },
  });

  if (!group) {
    throw new NotFoundException("Group not found", ErrorCode.GROUP_NOT_FOUND);
  }

  return group;
};

// Update Group
export const updateGroup = async (
  id: string,
  data: Partial<Group>
): Promise<Group> => {
  let group = await prismaClient.group.findUnique({ where: { id } });

  if (!group) {
    throw new NotFoundException("Group not found", ErrorCode.GROUP_NOT_FOUND);
  }

  group = await prismaClient.group.update({
    where: { id },
    data,
  });

  return group;
};

// Delete Group by ID
export const deleteGroupById = async (id: string): Promise<void> => {
  const group = await prismaClient.group.findUnique({ where: { id } });

  if (!group) {
    throw new NotFoundException("Group not found", ErrorCode.GROUP_NOT_FOUND);
  }

  await prismaClient.group.delete({ where: { id } });
};

// Add User to Group
export const addUserToGroup = async (
  name: string,
  groupId: string
): Promise<UserGroup> => {
  try {
    // Find the user by name using findFirst, since name is not unique
    const user = await prismaClient.user.findFirst({
      where: { name },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user is already in the group
    const existingUserGroup = await prismaClient.userGroup.findUnique({
      where: {
        userId_groupId: {
          userId: user.id,
          groupId: groupId,
        },
      },
    });

    // If the user is already in the group, throw a specific error
    if (existingUserGroup) {
      const error = new Error("User is already part of this group.");
      error.name = "UserAlreadyInGroup"; // Custom error name
      throw error.message;
    }

    // Connect the user to the group using user.id
    const userGroup = await prismaClient.userGroup.create({
      data: {
        user: { connect: { id: user.id } },
        group: { connect: { id: groupId } },
      },
    });

    return userGroup;
  } catch (error) {
    console.error("Error in addUserToGroup:", error);
    throw error;
  }
};

export const getUsersByGroupId = async (groupId: string): Promise<User[]> => {
  try {
    // Find all users in the group using groupId
    const usersInGroup = await prismaClient.userGroup.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        user: true, // Include the related user details
      },
    });

    // Extract user details from the userGroup relations
    const users = usersInGroup.map((userGroup) => userGroup.user);
    return users;
  } catch (error) {
    console.error("Error in getUsersByGroupId:", error);
    throw error;
  }
};

// Remove User from Group
export const removeUserFromGroup = async (
  userId: string,
  groupId: string
): Promise<void> => {
  try {
    await prismaClient.userGroup.deleteMany({
      where: {
        userId,
        groupId,
      },
    });
  } catch (error) {
    console.error("Error in removeUserFromGroup:", error);
    throw error;
  }
};

export const addCourseInGroup = async (
  categoryName: string,
  courseName: string,
  groupId: string
): Promise<CourseGroup> => {
  try {
    // Find the category by name
    const category = await prismaClient.category.findFirst({
      where: { name: categoryName },
    });

    if (!category) {
      throw new NotFoundException(
        "Category not found",
        ErrorCode.CATEGORY_NOT_FOUND
      );
    }

    // Find the course within the specified category
    const course = await prismaClient.course.findFirst({
      where: { name: courseName, categoryId: category.id },
    });

    if (!course) {
      throw new NotFoundException(
        "Course not found",
        ErrorCode.COURSE_NOT_FOUND
      );
    }

    // Check if the course is already in the group
    const existingCourseGroup = await prismaClient.courseGroup.findUnique({
      where: {
        courseId_groupId: {
          courseId: course.id,
          groupId: groupId,
        },
      },
    });

    if (existingCourseGroup) {
      throw new BadRequestExpection(
        "Course is already part of this group",
        ErrorCode.GROUP_NOT_FOUND
      );
    }

    // Connect the course to the group
    const courseGroup = await prismaClient.courseGroup.create({
      data: {
        course: { connect: { id: course.id } },
        group: { connect: { id: groupId } },
      },
    });

    return courseGroup;
  } catch (error) {
    console.error("Error in addCourseInGroup:", error);
    throw error;
  }
};

export const getCoursesByGroupId = async (
  groupId: string
): Promise<Course[]> => {
  try {
    // Find all users in the group using groupId
    const usersInGroup = await prismaClient.courseGroup.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        course: true, // Include the related user details
      },
    });

    // Extract user details from the userGroup relations
    const users = usersInGroup.map((courseGroup) => courseGroup.course);
    return users;
  } catch (error) {
    console.error("Error in getUsersByGroupId:", error);
    throw error;
  }
};
