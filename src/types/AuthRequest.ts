import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any; // Adjust this type as needed
}