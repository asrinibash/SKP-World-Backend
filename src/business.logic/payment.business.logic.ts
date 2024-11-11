import { prismaClient } from "../index";
import { OrderStatus } from "@prisma/client";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { BadRequestExpection } from "../errorHandle/BadRequestExpection";
import { ErrorCode } from "../errorHandle/root";
import { getCourseById } from "./course.bussiness.logic";
import axios from "axios";
const sha256 = require("sha256");
const uniqid = require("uniqid");

// Configuration (should be in environment variables)
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const SALT_KEY = process.env.PHONEPE_SALT_KEY;
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const APP_BE_URL = process.env.APP_BE_URL;

interface PaymentInitiateResponse {
  redirectUrl: string;
  merchantTransactionId: string;
  orderId: string; // Added to track order
}

interface PaymentValidationResponse {
  success: boolean;
  code: string;
  message: string;
  data?: any;
}

// Initiate Payment
export const initiatePayment = async (
  userId: string,
  courseId: string
): Promise<PaymentInitiateResponse> => {
  console.log(MERCHANT_ID,SALT_KEY,SALT_INDEX,APP_BE_URL);
  
  try {
    // Get course details
    const course = await getCourseById(courseId);
    console.log(`Got the course: ${course}`);

    if (!course) {
      throw new NotFoundException(
        "Course not found",
        ErrorCode.COURSE_NOT_FOUND
      );
    }

    // Check if user has already purchased the course
    const existingPurchase = await prismaClient.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
    });

    if (existingPurchase) {
      throw new BadRequestExpection(
        "Course already purchased",
        ErrorCode.COURSE_ALREADY_PURCHASED
      );
    }

    const merchantTransactionId = uniqid();

    // Create pending order
    const order = await prismaClient.order.create({
      data: {
        userId,
        courseId,
        amount: course.finalPrice,
        paymentStatus: OrderStatus.PENDING,
        paymentMethod: "PHONEPE",
      },
    });
    console.log("order",order);
    
    // Prepare PhonePe payload
    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: userId,
      amount: course.finalPrice * 100, // Convert to paise
      redirectUrl: `${APP_BE_URL}/api/payment/validate/${merchantTransactionId}/${order.id}`,
      redirectMode: "REDIRECT",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    console.log("payload:",payload);
    
    // Encode payload
    const base64EncodedPayload = Buffer.from(JSON.stringify(payload)).toString(
      "base64"
    );

    console.log("base64",base64EncodedPayload);
    
    // Generate checksum
    const string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
    const xVerifyChecksum = `${sha256(string)}###${SALT_INDEX}`;
    
    // Make PhonePe API call
    const response = await axios.post(
      `${PHONE_PE_HOST_URL}/pg/v1/pay`,
      { request: base64EncodedPayload },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerifyChecksum,
          accept: "application/json",
        },
      }
    );

    return {
      redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
      merchantTransactionId,
      orderId: order.id,
    };
  } catch (error) {
    console.error("Error in initiatePayment:", error);
    throw error;
  }
};

// Validate Payment
export const validatePayment = async (
  merchantTransactionId: string,
  orderId: string,
  userId: string
): Promise<PaymentValidationResponse> => {
  try {
    const statusUrl = `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`;
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}${SALT_KEY}`;
    const xVerifyChecksum = `${sha256(string)}###${SALT_INDEX}`;

    const response = await axios.get(statusUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": xVerifyChecksum,
        "X-MERCHANT-ID": merchantTransactionId,
        accept: "application/json",
      },
    });

    // Find order
    const order = await prismaClient.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        course: true,
      },
    });

    if (!order) {
      throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }

    if (order.userId !== userId) {
      throw new BadRequestExpection(
        "Unauthorized access to order",
        ErrorCode.UNAUTHORIZED
      );
    }

    if (response.data.code === "PAYMENT_SUCCESS") {
      // Update order status
      await prismaClient.order.update({
        where: { id: orderId },
        data: { paymentStatus: OrderStatus.COMPLETED },
      });

      // Create purchase record
      await prismaClient.purchase.create({
        data: {
          userId: order.userId,
          courseId: order.courseId!,
        },
      });

      return {
        success: true,
        code: "PAYMENT_SUCCESS",
        message: "Payment successful and course purchased",
      };
    } else {
      // Update order status for failed payment
      await prismaClient.order.update({
        where: { id: orderId },
        data: { paymentStatus: OrderStatus.FAILED },
      });

      return {
        success: false,
        code: response.data.code,
        message: "Payment failed",
        data: response.data,
      };
    }
  } catch (error) {
    console.error("Error in validatePayment:", error);
    throw error;
  }
};
