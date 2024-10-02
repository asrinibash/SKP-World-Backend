import axios from 'axios';
import { prismaClient } from "../index";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { ErrorCode } from "../errorHandle/root";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { Order, OrderStatus, Course, User } from "@prisma/client";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

// Generate an access token
const generateAccessToken = async () => {
  try {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await axios.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
    throw error;
  }
};

// Create PayPal order
export const createPayPalOrder = async (courseId: string, userId: string): Promise<{ id: string }> => {
  try {
    const course = await prismaClient.course.findUnique({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException("Course not found", ErrorCode.COURSE_NOT_FOUND);
    }

    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: course.price.toString(),
          },
        },
      ],
    };

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Create an order in the database
    await prismaClient.order.create({
      data: {
        userId,
        courseId,
        paymentStatus: OrderStatus.PENDING,
        amount: course.price,
        paymentMethod: "PayPal",
      },
    });

    return { id: response.data.id };
  } catch (error) {
    console.error("Failed to create PayPal order:", error);
    throw new BadRequestExpection("Failed to create PayPal order", ErrorCode.PAYMENT_FAILED);
  }
};

// Capture PayPal payment
export const capturePayPalPayment = async (orderId: string): Promise<Order> => {
  try {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    await axios.post(url, {}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Update the order status in the database
    const updatedOrder = await prismaClient.order.update({
      where: { id: orderId },
      data: { paymentStatus: OrderStatus.COMPLETED },
      include: { course: true, user: true },
    });

    // Create a purchase record
    await prismaClient.purchase.create({
      data: {
        userId: updatedOrder.userId,
        courseId: updatedOrder.courseId!,
      },
    });

    // Update course downloads count
    await prismaClient.course.update({
      where: { id: updatedOrder.courseId! },
      data: { downloads: { increment: 1 } },
    });

    return updatedOrder;
  } catch (error) {
    console.error("Failed to capture PayPal payment:", error);
    throw new BadRequestExpection("Failed to capture PayPal payment", ErrorCode.PAYMENT_FAILED);
  }
};

// Get order details
export const getOrderDetails = async (orderId: string): Promise<Order> => {
  const order = await prismaClient.order.findUnique({
    where: { id: orderId },
    include: { course: true, user: true },
  });

  if (!order) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }

  return order;
};
