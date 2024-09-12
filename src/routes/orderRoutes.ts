import { Router } from "express";
import {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
} from "../controllers/order.controller";
import { authenticateUser } from "../middleware/userAuthMiddleware";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";

const router = Router();

router.post("/create", authenticateUser, createOrderController);
router.get("/user/:userId", authenticateUser, getUserOrdersController);
router.get("/:id", authenticateUser, getOrderByIdController);
router.put("/:id/status", adminAuthMiddleware, updateOrderStatusController);

export default router;
