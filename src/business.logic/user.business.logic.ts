const { hashSync, compareSync } = require("bcrypt");
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { ErrorCode } from "../errorHandle/root";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { prismaClient } from "..";
import { UserStatus } from "@prisma/client";

// User Signup
// User Signup
export const signupUser = async (data: {
  email: string;
  name: string;
  password: string;
  image?: string;
}): Promise<User> => {
  const { email, name, password, image } = data;

  // Check if the user already exists
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw new BadRequestExpection(
      "User already exists",
      ErrorCode.USER_ALREADY_EXIST
    );
  }

  // Create a new user with default values for fields not provided
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      image,
      uploaded: false,
      downloadHistory: null,
      userGroups: {
        create: [],
      },
      orders: {
        create: [],
      },
      purchases: {
        create: [],
      },
      userType: "USER", // Assuming default user type
      userStatus: "PENDING",
      status: "PENDING",
      isSubscribed: false,
      subscriptionEnd: null,
    },
  });

  return user;
};

// User Login
export const loginUser = async (email: string, password: string) => {
  const user = await prismaClient.user.findUnique({ where: { email } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  if (!compareSync(password, user.password)) {
    throw new BadRequestExpection(
      "Incorrect password",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  // Check if user status is active
  if (user.userStatus !== "ACTIVE") {
    throw new BadRequestExpection(
      `Cannot log in. Your account is currently ${user.userStatus}.`,
      ErrorCode.UNKNOWN_ERROR
    );
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  return { user, token };
};

// Update User
export const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User> => {
  let user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  user = await prismaClient.user.update({
    where: { id },
    data,
  });

  return user;
};

// Get All Users
// Get All Users with Orders
export const getAllUsers = async (): Promise<User[]> => {
  return await prismaClient.user.findMany({
    include: {
      orders: {
        // Include orders associated with each user
        include: {
          course: true, // Include course details if needed
        },
      },
    },
  });
};

// Get All Users with Orders
export const getAllUser = async (): Promise<User[]> => {
  return await prismaClient.user.findMany({
    include: {
      orders: {
        // Include orders associated with each user
        include: {
          course: true, // Include course details if needed
        },
      },
    },
  });
};

// Get User by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  return user;
};

// Delete User by ID
export const deleteUserById = async (id: string): Promise<void> => {
  const user = await prismaClient.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  await prismaClient.user.delete({ where: { id } });
};

// Delete All Users
export const deleteAllUsers = async (): Promise<void> => {
  await prismaClient.user.deleteMany();
};

// Upload Image
export const uploadImage = async (
  userId: string,
  imageUrl: string
): Promise<User> => {
  // Ensure the user exists
  let user = await prismaClient.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }

  // Update the user with the new image URL and set uploaded to true
  user = await prismaClient.user.update({
    where: { id: userId },
    data: {
      image: imageUrl,
      uploaded: true,
    },
  });

  return user;
};

// userService.ts

export const updateUserStatusById = async (
  userId: string,
  status: UserStatus
) => {
  try {
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: { userStatus: status },
    });
    return updatedUser;
  } catch (error: any) {
    throw new Error(`Could not update user status: ${error.message}`);
  }
};

// Get Users by Status
// Get Users by Status
export const getUsersByStatus = async (status: string): Promise<User[]> => {
  return await prismaClient.user.findMany({ where: { status } });
};

// Get All Users with Orders
// export const getAllUserss = async (): Promise<User[]> => {
//   return await prismaClient.user.findMany({
//     include: {
//       orders: {
//         // Include orders associated with each user
//         include: {
//           course: true, // Include course details if needed
//         },
//       },
//     },
//   });
// };
