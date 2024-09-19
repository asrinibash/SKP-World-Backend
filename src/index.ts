const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const multer = require("multer"); // Import Multer
const { errorMiddleware } = require("./middleware/errorMiddleware");
import { PORT } from "./secret";
import rootRouter from "./routes";

const app = express();

// Configure Multer
const upload = multer({ dest: "uploads/" }); // Adjust the destination folder as needed

app.use(
  cors({
    origin: "*", // Your frontend URL
    methods: "GET, POST, PUT, OPTIONS, DELETE",
    allowedHeaders: "Authorization, Content-Type",
  })
);
app.use(express.json());

// Middleware to serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Register routes
app.use("/api/v1", rootRouter); //* Entry point for all routes

// Initialize Prisma Client
export const prismaClient = new PrismaClient({
  log: ["query"],
});

// Register the error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at : ${PORT}`);
});
