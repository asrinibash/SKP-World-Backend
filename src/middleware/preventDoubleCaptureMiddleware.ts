import { Response, NextFunction } from "express";
import { prismaClient } from "../index";
import { AuthRequest } from "../types/AuthRequest";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { ErrorCode } from "../errorHandle/root";
import { OrderStatus } from ".prisma/client";

export const preventDoubleCaptureMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;

    const order = await prismaClient.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }

    if (order.paymentStatus === OrderStatus.COMPLETED) {
      throw new BadRequestExpection(
        "Payment has already been captured for this order",
        ErrorCode.PAYMENT_ALREADY_CAPTURED
      );
    }

    // Use type assertion here
    (req as AuthRequest).order = order;

    next();
  } catch (error) {
    next(error);
  }
};
