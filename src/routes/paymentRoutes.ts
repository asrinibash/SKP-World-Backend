import { Router } from "express";
import {
  createPayPalOrderController,
  capturePayPalPaymentController,
  getOrderDetailsController,
} from "../controllers/payment.controller";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware";
import { orderOwnershipMiddleware } from "../middleware/orderOwnershipMiddleware"; // You'll need to create this
import { preventDoubleCaptureMiddleware } from "../middleware/preventDoubleCaptureMiddleware"; // You'll need to create this

const paymentRoutes = Router();

paymentRoutes.post("/create-paypal-order", userAuthMiddleware, createPayPalOrderController);
paymentRoutes.post("/capture-paypal-payment/:orderId", userAuthMiddleware, preventDoubleCaptureMiddleware, capturePayPalPaymentController);
paymentRoutes.get("/order/:orderId", userAuthMiddleware, orderOwnershipMiddleware, getOrderDetailsController);

export default paymentRoutes;
