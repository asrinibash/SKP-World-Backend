import express from "express";

import {
  createChildCommentController,
  createParentCommentController,
  deleteAllCommentsController,
  deleteCommentByIdController,
  editCommentController,
  getAllCommentsController,
  getCommentByIdController,
} from "../controllers/comment.controller";

const router = express.Router();

// Define the POST route for the contact form submission
router.post("/parent", createParentCommentController); // For creating parent comments
router.post("/child", createChildCommentController); // For creating replies

router.get("/", getAllCommentsController);
router.get("/:id", getCommentByIdController);
router.put("/:id", editCommentController);
router.delete("/deleteAll", deleteAllCommentsController);
router.delete("/:id", deleteCommentByIdController);

export default router;
