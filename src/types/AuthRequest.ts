import { Request } from 'express';
import { User, Order } from '@prisma/client';

export interface AuthRequest extends Request {
  user?: User;
  order?: Order;
}