import express from "express";
import {
  signupUserController,
  loginUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserByIdController,
  deleteAllUsersController,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", signupUserController);
router.post("/login", loginUserController);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserByIdController);
// router.delete("/", deleteAllUsersController);

export default router;
