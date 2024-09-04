import express from "express";
import {
  signupUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserByIdController,
  deleteAllUsersController,
} from "../controllers/User-controller";

const router = express.Router();

// Route to signup a new user
router.post("/signup", signupUserController);

// Route to login a user
router.post("/login", loginUserController);

// Route to get all users
router.get("/", getAllUsersController);

// Route to get a user by ID
router.get("/:id", getUserByIdController);

// Route to update a user
router.put("/:id", updateUserController);

// Route to delete a user by ID
router.delete("/:id", deleteUserByIdController);

// Route to delete all users
router.delete("/", deleteAllUsersController);

export default router;
