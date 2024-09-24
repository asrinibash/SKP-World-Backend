import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    adminId?: string;
    userId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      files?: Express.Multer.File[]; // Allow files to be either an array of files or undefined
    }
  }
}
