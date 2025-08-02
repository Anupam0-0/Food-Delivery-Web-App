import { Router } from "express";
import prisma from "../utils/prisma";
import { authenticate } from "../middleware/auth";
import { roleGuard } from "../middleware/roleGuard";

import {
	getMenuByID,
	getAllMenuItems,
	updateMenuById,
    deleteMenuById
} from "../controllers/menuItem.controller";

const router = Router();

router.post(
	"/api/restaurants/:id/menu-items",
	authenticate,
	roleGuard("ADMIN", "MANAGER"),
	getMenuByID
);

router.get("/api/restaurants/:id/menu-items", getAllMenuItems);

router.put(
	"/api/menu-items/:id",
	authenticate,
	roleGuard("ADMIN", "MANAGER"),
	updateMenuById
);

router.delete(
	"/api/menu-items/:id",
	authenticate,
	roleGuard("ADMIN", "MANAGER"),
	deleteMenuById
);
