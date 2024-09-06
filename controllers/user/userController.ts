import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
} from "../../services/user/userService";

export const createUser = async (req: Request, res: Response) => {
  const { email, name, posts } = req.body;
  try {
    const newUser = await createUserService({ email, name }, posts);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedUser = await updateUserService(parseInt(id), name);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserService(parseInt(id));
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
