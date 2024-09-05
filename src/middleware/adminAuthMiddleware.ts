// middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";
import { UnauthorizedException } from "../errorHandle/UnauthorizedException";
import { ErrorCode } from "../errorHandle/root";

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedException("Token not provided", ErrorCode.UNAUTHORIZED));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string };
    req.adminId = decoded.adminId; // Attach adminId to the request object
    next();
  } catch (error) {
    next(new UnauthorizedException("Invalid token", ErrorCode.UNAUTHORIZED));
  }
};
