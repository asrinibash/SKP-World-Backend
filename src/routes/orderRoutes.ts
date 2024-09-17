import { Router } from "express";
import {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  getAllOrdersController,
} from "../controllers/order.controller";
// import { authenticateUser } from "../middleware/userAuthMiddleware";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";

const router = Router();

router.post("/create", createOrderController);
router.get("/user/:userId", getUserOrdersController);
router.get("/:id", getOrderByIdController);
router.put("/:id/status", adminAuthMiddleware, updateOrderStatusController);
router.get("/", adminAuthMiddleware, getAllOrdersController); // New route to get all orders

export default router;
