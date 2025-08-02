// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: any, res: Response, next: NextFunction) => {
	const token = req.headers.authoriztion?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Token missing" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		req.user = decoded;
		next();
	} catch {
		res.status(401).json({ error: "Invalid token" });
	}
};
