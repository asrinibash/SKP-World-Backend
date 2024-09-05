import { Request } from "express";

declare module "express" {
  export interface Request {
    adminId?: string; // Adding optional adminId to the Request type
  }
}