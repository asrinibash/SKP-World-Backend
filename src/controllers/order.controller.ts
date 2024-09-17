import { Request, Response, NextFunction } from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} from "../business.logic/order.bussiness.logic";
import { OrderStatus } from "@prisma/client";

// Create Order
export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, courseId, paymentMethod, amount } = req.body;
    const order = await createOrder({
      userId,
      courseId,
      paymentMethod,
      amount,
    });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// Get User Orders
export const getUserOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const orders = await getUserOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Get Order by ID
export const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// Update Order Status
export const updateOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    // Validate the status
    if (!Object.values(OrderStatus).includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await updateOrderStatus(id, paymentStatus);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// Get All Orders Controller
export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
