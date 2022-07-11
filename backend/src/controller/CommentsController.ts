import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const commentsFilePath = path.join(__dirname, "../../database/data.json");
const dataFile: any = JSON.parse(fs.readFileSync(commentsFilePath, "utf-8"));

export const getAllComments = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      message: "Success",
      totalComments: dataFile.comments.length,
      dataFile,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export const createNewComment = async ( req: Request, res: Response ) => {
  try {
    const newComment = {
      id: Math.floor(Math.random() * 1000),
      content: req.body.content,
      createdAt: new Date().toISOString(),
      score: 0,
      replies: [],
      user: {
        image: {
          "png": "./images/avatars/image-juliusomo.png",
					"webp": "./images/avatars/image-juliusomo.webp"
        },
        username: 'juliusomo',
      }
    }

    await dataFile.comments.push(newComment);
    
    fs.writeFileSync(commentsFilePath, JSON.stringify(dataFile));

    res.status(201).json({
      message: 'Success',
      newComment
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
}

export const editComment = async ( req: Request, res: Response ) => {
  try {
    const commentId = Number(req.params.id);
    const currentComment = await dataFile.comments.find((comment: any) => comment.id === commentId);
    currentComment.content = req.body.content;

    fs.writeFileSync(commentsFilePath, JSON.stringify(dataFile));

    res.status(201).json({
      message: 'Success',
      currentComment
    });
    
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const commentId: number = Number(req.params.id);
    const removeComment: any = await dataFile.comments.filter((comment: any) => comment.id !== commentId);
    dataFile.comments = removeComment;

    fs.writeFileSync(commentsFilePath, JSON.stringify(dataFile));

    res.status(201).json({
      message: 'The comment has been deleted',
    })

  } catch(error) {
    res.status(400).json({
      message: error,
    });
  }
}

export const addReply = async (req: Request, res: Response) => {
  try {
    const commentId: number = Number(req.params.id);
    const reply = {
      id: Math.floor(Math.random() * 1000),
      content: req.body.content,
      score: 0,
      replyingTo: req.body.replyingTo,
      createdAt: new Date().toISOString(),
      user: {
        image: {
          "png": "../images/avatars/image-juliusomo.png",
					"webp": "../images/avatars/image-juliusomo.webp"
        },
        username: 'juliusomo',
      }
    }
    const comment: any = await dataFile.comments.find((comment: any) => comment.id === commentId);
    await comment.replies.push(reply);

    fs.writeFileSync(commentsFilePath, JSON.stringify(dataFile));

    res.status(201).json({
      message: 'Success',
      comment
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

export const deleteReply = async (req: Request, res: Response) => {
  try {
    const { commentId, replyId } = req.params
    const comment: any = await dataFile.comments.find((comment: any) => comment.id === Number(commentId));
    const reply: any = await comment.replies.filter((reply: any) => reply.id !== Number(replyId));
    comment.replies = reply;

    fs.writeFileSync(commentsFilePath, JSON.stringify(dataFile));

    res.status(201).json({
      message: 'Success',
      comment
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}

export const editReply = async (req: Request, res: Response) => {
  try {
    const { commentId, replyId } = req.params
    const comment: any = await dataFile.comments.find((comment: any) => comment.id === Number(commentId));
    const reply: any = await comment.replies.find((reply: any) => reply.id === Number(replyId));
    reply.content = req.body.content;

    fs.writeFileSync(commentsFilePath, JSON.stringify(dataFile));

    res.status(201).json({
      message: 'Success',
      comment
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}