const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { errorMiddleware } = require("./middleware/errorMiddleware");
import { PORT } from "./secret";
import rootRouter from "./routes";

const app = express();

app.use(
  cors({
    origin: "*", // Your frontend URL
    methods: "GET, POST, PUT, OPTIONS, DELETE", // Removed DELETE method
    allowedHeaders: "Authorization, Content-Type", // Include the headers you want to allow
  })
);
app.use(express.json());

app.use("/api/v1", rootRouter); //* Entry point for all routes

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at : ${PORT}`);
});
