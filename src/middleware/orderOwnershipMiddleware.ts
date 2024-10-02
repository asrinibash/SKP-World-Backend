import { Response, NextFunction } from "express";
import { prismaClient } from "../index";
import { AuthRequest } from "../types/AuthRequest";
import { UnauthorizedException } from "../errorHandle/UnauthorizedException";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { ErrorCode } from "../errorHandle/root";

export const orderOwnershipMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const orderId = req.params.orderId;

    if (!userId) {
      throw new UnauthorizedException(
        "User not authenticated",
        ErrorCode.UNAUTHORIZED
      );
    }

    const order = await prismaClient.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }

    if (order.userId !== userId) {
      throw new UnauthorizedException(
        "Access denied. Not the order owner.",
        ErrorCode.UNAUTHORIZED
      );
    }

    // Use type assertion here
    (req as AuthRequest).order = order;

    next();
  } catch (error) {
    next(error);
  }
};
