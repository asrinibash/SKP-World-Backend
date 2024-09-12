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
exports.updateOrderStatus = exports.getOrderById = exports.getUserOrders = exports.createOrder = void 0;
const index_1 = require("../index");
const NotFoundException_1 = require("../errorHandle/NotFoundException");
const client_1 = require("@prisma/client");
const root_1 = require("../errorHandle/root");
// Create Order
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, courseId, paymentMethod, amount } = data;
    try {
        // Check if the user and course exist
        const user = yield index_1.prismaClient.user.findUnique({ where: { id: userId } });
        const course = yield index_1.prismaClient.course.findUnique({ where: { id: courseId } });
        if (!user) {
            throw new NotFoundException_1.NotFoundException("User not found", root_1.ErrorCode.USER_NOT_FOUND);
        }
        if (!course) {
            throw new NotFoundException_1.NotFoundException("Course not found", root_1.ErrorCode.COURSE_NOT_FOUND);
        }
        // Create a new order
        const order = yield index_1.prismaClient.order.create({
            data: {
                userId,
                courseId,
                paymentMethod,
                amount,
                paymentStatus: client_1.OrderStatus.PENDING,
            },
        });
        return order;
    }
    catch (error) {
        console.error("Error in createOrder:", error);
        throw error;
    }
});
exports.createOrder = createOrder;
// Get User Orders by User ID
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield index_1.prismaClient.order.findMany({
        where: { userId },
        include: { course: true },
    });
    if (!orders.length) {
        throw new NotFoundException_1.NotFoundException("Orders not found for this user", root_1.ErrorCode.ORDERS_NOT_FOUND);
    }
    return orders;
});
exports.getUserOrders = getUserOrders;
// Get Order by ID
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield index_1.prismaClient.order.findUnique({
        where: { id },
        include: { user: true, course: true },
    });
    if (!order) {
        throw new NotFoundException_1.NotFoundException("Order not found", root_1.ErrorCode.ORDER_NOT_FOUND);
    }
    return order;
});
exports.getOrderById = getOrderById;
// Update Order Status
const updateOrderStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield index_1.prismaClient.order.findUnique({ where: { id } });
    if (!order) {
        throw new NotFoundException_1.NotFoundException("Order not found", root_1.ErrorCode.ORDER_NOT_FOUND);
    }
    const updatedOrder = yield index_1.prismaClient.order.update({
        where: { id },
        data: { paymentStatus: status },
    });
    return updatedOrder;
});
exports.updateOrderStatus = updateOrderStatus;
