import { Request, Response } from "express";
import prisma from "../utils/prisma";

const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.status(201).json(user);
};

export { getAllUsers, createUser };
