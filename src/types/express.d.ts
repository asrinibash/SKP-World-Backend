import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    adminId?: string;
    userId?: string;
  }
}
