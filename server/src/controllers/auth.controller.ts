import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../utils/prisma";
import { Request, Response, NextFunction } from "express";

const register = async (req: any, res: Response) => {
	const { name, email, password, role } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({
		data: { name, email, password: hash, role },
	});

	res.json(user);
};

const login = async (req: any, res: Response) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email } });
	if (
		!user ||
		!user.password ||
		!(await bcrypt.compare(password, user.password))
	) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	const token = jwt.sign(
		{ id: user.id, role: user.role, email: user.email },
		process.env.JWT_SECRET!,
		{ expiresIn: "7d" }
	);
	res.json({ token });
};


const getSelf = async (req: any, res: Response) => {
	const userId = req.user?.id;
	if (!userId) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}
	res.json(user);
};

const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await prisma.user.findUnique({ where: { id: id } });
	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}
	res.json(user);
};

const getAllUsers = async (_req: Request, res: Response) => {
	const users = await prisma.user.findMany();
	res.json(users);
};

export { register, login, getAllUsers, getUser, getSelf };
