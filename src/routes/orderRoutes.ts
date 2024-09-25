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

// Route to create a new order
router.post("/create", createOrderController);

// Route to get orders for a specific user by user ID
router.get("/user/:userId", getUserOrdersController);

// Route to get a specific order by ID
router.get("/:id", getOrderByIdController);

// Route to update the status of a specific order (admin only)
router.put("/:id/status", adminAuthMiddleware, updateOrderStatusController);

// Route to get all orders (consider renaming for clarity)
router.get("/getAllOrders", getAllOrdersController); // Adjusted naming for consistency

// Route to get all orders by user name

export default router;
