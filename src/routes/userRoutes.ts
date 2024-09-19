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
  deleteAllUsersController,
  uploadImageController,
} from "../controllers/user.controller";

const router = express.Router();
const upload = multer(); // Configure Multer as needed

router.post("/signup", signupUserController);
router.post("/login", loginUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserByIdController);
// router.delete("/", deleteAllUsersController);
router.post(
  "/:userId/upload",
  multerUpload.single("image"),
  uploadImageController
);

export default router;
