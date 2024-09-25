import express from "express";
import multerUpload from "../multer/multer.config"; // Adjust the path as needed

import multer from "multer";

import {
  signupUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserByIdController,
  uploadImageController,
  getUsersByStatusController,
  updateUserStatusController,
} from "../controllers/user.controller";
import { updateUserStatusById } from "../business.logic/user.business.logic";

const router = express.Router();
const upload = multer(); // Configure Multer as needed

router.post("/signup", signupUserController);
router.post("/login", loginUserController);
router.get("/getAll", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserByIdController);
// router.delete("/", deleteAllUsersController);
router.post(
  "/:userId/upload",
  multerUpload.single("image"),
  uploadImageController
);

// Route for updating user status
router.put("/:id/status", updateUserStatusController);

// Route for getting users by status
router.get("/status/:status", getUsersByStatusController);

export default router;
