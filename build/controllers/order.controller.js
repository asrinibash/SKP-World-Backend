"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusController = exports.getOrderByIdController = exports.getUserOrdersController = exports.createOrderController = void 0;
const order_bussiness_logic_1 = require("../business.logic/order.bussiness.logic");
const client_1 = require("@prisma/client");
// Create Order
const createOrderController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId, paymentMethod, amount } = req.body;
        const order = yield (0, order_bussiness_logic_1.createOrder)({ userId, courseId, paymentMethod, amount });
        res.status(201).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderController = createOrderController;
// Get User Orders
const getUserOrdersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield (0, order_bussiness_logic_1.getUserOrders)(userId);
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserOrdersController = getUserOrdersController;
// Get Order by ID
const getOrderByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield (0, order_bussiness_logic_1.getOrderById)(id);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderByIdController = getOrderByIdController;
// Update Order Status
const updateOrderStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Validate the status
        if (!Object.values(client_1.OrderStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }
        const updatedOrder = yield (0, order_bussiness_logic_1.updateOrderStatus)(id, status);
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderStatusController = updateOrderStatusController;
