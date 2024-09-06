import prisma from "../../models/prisma";
import { User, Post } from "../../types/userTypes";

export const createUserService = async (userData: User, posts: Post[]) => {
  return await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      posts: { create: posts },
    },
  });
};

export const getAllUsersService = async () => {
  return await prisma.user.findMany({ include: { posts: true } });
};

export const updateUserService = async (id: number, name: string) => {
  return await prisma.user.update({ where: { id }, data: { name } });
};

export const deleteUserService = async (id: number) => {
  await prisma.post.deleteMany({
    where: { userId: id },
  });
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
};
