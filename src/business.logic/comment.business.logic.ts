import { prismaClient } from "..";
import { NotFoundException } from "../errorHandle/NotFoundException";
import { ErrorCode } from "../errorHandle/root";

export const createParentComment = async (data: {
  userId: string;
  courseId: string;
  content: string;
}): Promise<Comment> => {
  const { userId, courseId, content } = data;

  try {
    // Check if user and course exist
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    const course = await prismaClient.course.findUnique({
      where: { id: courseId },
    });

    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    if (!course) {
      throw new NotFoundException(
        "Course not found",
        ErrorCode.COURSE_NOT_FOUND
      );
    }

    // Create the parent comment (no parentCommentId)
    const comment = await prismaClient.comment.create({
      data: {
        userId,
        courseId,
        content,
      },
    });

    return comment;
  } catch (error) {
    console.error("Error in createParentComment:", error);
    throw error;
  }
};

export const createChildComment = async (data: {
  userId: string;
  courseId: string;
  content: string;
  parentCommentId: string; // Required for replies
}): Promise<Comment> => {
  const { userId, courseId, content, parentCommentId } = data;

  try {
    // Check if user and course exist
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    const course = await prismaClient.course.findUnique({
      where: { id: courseId },
    });

    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }
    if (!course) {
      throw new NotFoundException(
        "Course not found",
        ErrorCode.COURSE_NOT_FOUND
      );
    }

    // Verify the parent comment exists
    const parentComment = await prismaClient.comment.findUnique({
      where: { id: parentCommentId },
    });
    if (!parentComment) {
      throw new NotFoundException(
        "Parent comment not found",
        ErrorCode.COMMENT_NOT_FOUND
      );
    }

    // Create the child comment (reply)
    const comment = await prismaClient.comment.create({
      data: {
        userId,
        courseId,
        content,
        parentCommentId,
      },
    });

    return comment;
  } catch (error) {
    console.error("Error in createChildComment:", error);
    throw error;
  }
};

// / Get all comments for a course or globally
export const getAllComments = async (
  courseId?: string // Optional parameter to filter by course
): Promise<Comment[]> => {
  try {
    // If courseId is provided, fetch comments for that specific course
    const comments = await prismaClient.comment.findMany({
      where: {
        courseId: courseId ? courseId : undefined, // Only filter if courseId is provided
      },
      include: {
        user: true, // Optionally include user details if needed
        parentComment: true, // Optionally include parent comment for replies
      },
    });

    if (!comments) {
      throw new NotFoundException(
        "No comments found",
        ErrorCode.COMMENT_NOT_FOUND
      );
    }

    return comments;
  } catch (error) {
    console.error("Error in getAllComments:", error);
    throw error;
  }
};

// Get a comment by ID
export const getCommentById = async (id: string): Promise<Comment | null> => {
  try {
    const comment = await prismaClient.comment.findUnique({
      where: { id },
      include: {
        user: true, // Optionally include user details
        parentComment: true, // Optionally include parent comment if it's a reply
      },
    });
    if (!comment) {
      throw new NotFoundException(
        "Comment not found",
        ErrorCode.COMMENT_NOT_FOUND
      );
    }
    return comment;
  } catch (error) {
    console.error("Error in getCommentById:", error);
    throw error;
  }
};

// Edit a comment by ID
export const editComment = async (
  id: string,
  content: string
): Promise<Comment> => {
  try {
    const comment = await prismaClient.comment.update({
      where: { id },
      data: { content },
    });
    return comment;
  } catch (error) {
    console.error("Error in editComment:", error);
    throw error;
  }
};

// Delete all comments
export const deleteAllComments = async (): Promise<void> => {
  try {
    await prismaClient.comment.deleteMany();
  } catch (error) {
    console.error("Error in deleteAllComments:", error);
    throw error;
  }
};

// Delete a comment by ID
export const deleteCommentById = async (id: string): Promise<void> => {
  try {
    await prismaClient.comment.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error in deleteCommentById:", error);
    throw error;
  }
};
