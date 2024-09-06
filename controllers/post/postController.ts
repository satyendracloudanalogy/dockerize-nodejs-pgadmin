import { Request, Response } from "express";
import {
  deletePostService,
  updatePostService,
  createPostService,
  getAllPostsService,
} from "../../services/post/postService";

export const createPost = async (req: Request, res: Response) => {
  const { title, content, userId } = req.body;
  try {
    if (!title || !userId) {
      return res.status(400).json({ error: "Title and userId are required" });
    }

    const newPost = await createPostService(title, content, parseInt(userId));
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const users = await getAllPostsService(parseInt(userId));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;
  try {
    const updatedPost = await updatePostService(
      { title, content, userId },
      parseInt(id)
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedPost = await deletePostService(parseInt(id));
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
