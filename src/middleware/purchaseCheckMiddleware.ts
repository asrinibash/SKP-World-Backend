import { Response, NextFunction } from 'express';
import { prismaClient } from '../index';
import { AuthRequest } from '../types/AuthRequest';
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { ErrorCode } from "../errorHandle/root";

export const purchaseCheckMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const courseId = req.params.id;

    if (!userId || !courseId) {
      throw new BadRequestExpection("User ID or Course ID is missing", ErrorCode.BAD_REQUEST);
    }

    const purchase = await prismaClient.purchase.findFirst({
      where: { 
        userId: userId,
        courseId: courseId
      }
    });

    if (!purchase) {
      throw new BadRequestExpection("Access denied. Course not purchased.", ErrorCode.UNAUTHORIZED);
    }

    next();
  } catch (error) {
    next(error);
  }
};
