import prisma from "../../models/prisma";
import { Post } from "../../types/userTypes";

export const createPostService = async (
  title: string,
  content: string,
  userId: number
) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
};

export const getAllPostsService = async (userId: number) => {
  return await prisma.post.findMany({ where: { userId } });
};

export const updatePostService = async (postData: Post, id: number) => {
  return await prisma.post.update({
    where: { id, userId: postData.userId },
    data: postData,
  });
};

export const deletePostService = async (id: number) => {
  return await prisma.post.delete({ where: { id } });
};
