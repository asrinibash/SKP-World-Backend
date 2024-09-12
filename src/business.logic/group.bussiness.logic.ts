// src/business.logic/group.bussiness.logic.ts
import { prismaClient } from "../index";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { Group, User, UserGroup } from ".prisma/client";
import { ErrorCode } from "../errorHandle/root";

// Create Group
export const createGroup = async (data: {
  name: string;
  description: string;
  createdById: string;
}): Promise<Group> => {
  const { name, description, createdById } = data;

  try {
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
        createdBy: { connect: { id: createdById } },
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
  userId: string,
  groupId: string
): Promise<UserGroup> => {
  try {
    const userGroup = await prismaClient.userGroup.create({
      data: {
        user: { connect: { id: userId } },
        group: { connect: { id: groupId } },
      },
    });

    return userGroup;
  } catch (error) {
    console.error("Error in addUserToGroup:", error);
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
