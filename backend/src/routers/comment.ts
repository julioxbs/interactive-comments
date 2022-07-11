import { Router } from "express";
import { getAllComments, createNewComment, editComment, deleteComment, addReply, deleteReply, editReply } from "../controller/CommentsController";

export const commentRouter = Router();

// Endpoints for comments
commentRouter.get("/v1/comments", getAllComments)
commentRouter.post("/v1/createComment", createNewComment);
commentRouter.delete("/v1/comments/:id", deleteComment);
commentRouter.patch("/v1/comments/:id", editComment);

// Endpoints for replies
commentRouter.post("/v1/reply/:id", addReply);
commentRouter.patch("/v1/reply/:commentId/:replyId", editReply)
commentRouter.delete("/v1/reply/:commentId/:replyId", deleteReply);