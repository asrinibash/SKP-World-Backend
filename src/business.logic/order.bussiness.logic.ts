import { prismaClient } from "../index";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { Order, OrderStatus } from "@prisma/client";
import { ErrorCode } from "../errorHandle/root";

// Create Order
export const createOrder = async (data: {
  userId: string;
  courseId: string;
  paymentMethod: string;
  amount: number;
}): Promise<Order> => {
  const { userId, courseId, paymentMethod, amount } = data;

  try {
    // Check if the user and course exist
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    const course = await prismaClient.course.findUnique({
      where: { id: courseId },
    });

    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    if (!course) {
      throw new NotFoundException(
        "Course not found",
        ErrorCode.COURSE_NOT_FOUND
      );
    }

    // Create a new order
    const order = await prismaClient.order.create({
      data: {
        userId,
        courseId,
        paymentMethod,
        amount,
        paymentStatus: OrderStatus.PENDING,
      },
    });

    return order;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
};

// Get User Orders by User ID
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const orders = await prismaClient.order.findMany({
    where: { userId },
    include: { course: true },
  });

  if (!orders.length) {
    throw new NotFoundException(
      "Orders not found for this user",
      ErrorCode.ORDERS_NOT_FOUND
    );
  }

  return orders;
};

// Get Order by ID
export const getOrderById = async (id: string): Promise<Order | null> => {
  const order = await prismaClient.order.findUnique({
    where: { id },
    include: { user: true, course: true },
  });

  if (!order) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }

  return order;
};

// Update Order Status
export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<Order> => {
  const order = await prismaClient.order.findUnique({ where: { id } });

  if (!order) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }

  const updatedOrder = await prismaClient.order.update({
    where: { id },
    data: { paymentStatus: status },
  });

  return updatedOrder;
};

// Get All Orders
export const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prismaClient.order.findMany({
    include: {
      user: true,
      course: true,
    },
  });

  if (!orders.length) {
    throw new NotFoundException("No orders found", ErrorCode.ORDERS_NOT_FOUND);
  }

  return orders;
};
