// controllers/payment.controller.ts

import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";
import {
  initiatePayment,
  validatePayment,
} from "../business.logic/payment.business.logic";

export const initiatePaymentController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    const { courseId } = req.body;
    
    if (!userId || !courseId) {
      return res.status(400).json({
        message: "courseId is required",
      });
    }

    const result = await initiatePayment(userId, courseId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const validatePaymentController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { merchantTransactionId, orderId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await validatePayment(merchantTransactionId, orderId, userId);

    if (result.success) {
      // Redirect to success page
      res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
    } else {
      // Redirect to failure page
      res.redirect(`${process.env.FRONTEND_URL}/payment/failure?error=${result.message}`);
    }
  } catch (error) {
    next(error);
  }
};