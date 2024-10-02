import { Response, NextFunction } from "express";
import { AuthRequest } from '../types/AuthRequest';  // Import your custom AuthRequest type
import { createPayPalOrder, capturePayPalPayment, getOrderDetails } from "../business.logic/payment.business.logic";
import { UnauthorizedException } from "../errorHandle/UnauthorizedException";
import { ErrorCode } from "../errorHandle/root";

export const createPayPalOrderController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UnauthorizedException("User not authenticated", ErrorCode.UNAUTHORIZED);
    }
    const { courseId } = req.body;
    const userId = req.user.id;
    const order = await createPayPalOrder(courseId, userId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const capturePayPalPaymentController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const capturedOrder = await capturePayPalPayment(orderId);
    res.status(200).json(capturedOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrderDetailsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderDetails(orderId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
