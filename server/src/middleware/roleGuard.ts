import { Request, Response, NextFunction } from "express";

export const roleGuard = (...roles: string[]) => {
	return (req: any, res: Response, next: NextFunction) => {
		if (!roles.includes(req.user.role)) {
			return res.status(403).json({ error: "Access Denied" });
		}

		next();
	};
};
