import { Request, Response, NextFunction } from "express";
import {
  createChildComment,
  createParentComment,
  deleteAllComments,
  deleteCommentById,
  editComment,
  getAllComments,
  getCommentById,
} from "../business.logic/comment.business.logic";

// Controller for creating a parent comment
export const createParentCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, courseId, content } = req.body;
    const comment = await createParentComment({ userId, courseId, content });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Controller for creating a child comment
export const createChildCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, courseId, content, parentCommentId } = req.body;
    const comment = await createChildComment({
      userId,
      courseId,
      content,
      parentCommentId,
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Controller for fetching all comments
export const getAllCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.query; // Get courseId from query parameters (optional)
    const comments = await getAllComments(courseId as string | undefined);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

// Controller for getting a comment by ID
export const getCommentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Get comment ID from route parameters
    const comment = await getCommentById(id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

// Controller for editing a comment
export const editCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Get comment ID from route parameters
    const { content } = req.body; // Get new content from request body
    const updatedComment = await editComment(id, content);
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// Controller for deleting all comments
export const deleteAllCommentsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllComments();
    res.status(204).send(); // No content to return after deletion
  } catch (error) {
    next(error);
  }
};

// Controller for deleting a comment by ID
export const deleteCommentByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params; // Get comment ID from route parameters
    await deleteCommentById(id);
    res.status(204).send(); // No content to return after deletion
  } catch (error) {
    next(error);
  }
};
