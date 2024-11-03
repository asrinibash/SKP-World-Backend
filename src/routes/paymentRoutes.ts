// routes/payment.routes.ts

import { Router } from "express";
import {
  initiatePaymentController,
  validatePaymentController,
} from "../controllers/payment.controller";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware";
import { orderOwnershipMiddleware } from "../middleware/orderOwnershipMiddleware";
import { preventDoubleCaptureMiddleware } from "../middleware/preventDoubleCaptureMiddleware";

const paymentRoutes = Router();

// Initiate payment - requires authentication
paymentRoutes.post(
  '/initiate',
  userAuthMiddleware,
  initiatePaymentController
);

// Validate payment - requires authentication and order ownership
paymentRoutes.get(
  '/validate/:merchantTransactionId/:orderId',
  userAuthMiddleware,
  orderOwnershipMiddleware,
  preventDoubleCaptureMiddleware,
  validatePaymentController
);

export default paymentRoutes;