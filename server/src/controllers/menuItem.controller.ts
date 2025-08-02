import { Request, Response, Router } from "express";
import prisma from "../utils/prisma";
import { authenticate } from "../middleware/auth";
import { roleGuard } from "../middleware/roleGuard";

const router = Router();

// Create menu item

const getMenuByID = async (req: Request, res: Response) => {
	try {
		const restaurantId = req.params.id;
		const { name, price, description } = req.body;
		const menuItem = await prisma.menuItem.create({
			data: <any>{
				name,
				price,
				description,
				restaurantId,
			},
		});
		res.status(201).json(menuItem);
	} catch (error) {
		res.status(500).json({ error: "Failed to create menu item" });
	}
};

// Get all menu items for a restaurant

const getAllMenuItems = async (req: Request, res: Response) => {
	try {
		const restaurantId = req.params.id;
		const menuItems = await prisma.menuItem.findMany({
			where: { restaurantId },
		});
		res.json(menuItems);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch menu items" });
	}
};

// Update menu item
const updateMenuById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { name, price, description } = req.body;
		const menuItem = await prisma.menuItem.update({
			where: { id },
			data: { name, price, description },
		});
		res.json(menuItem);
	} catch (error) {
		res.status(500).json({ error: "Failed to update menu item" });
	}
};

// Delete menu item
const deleteMenuById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await prisma.menuItem.delete({ where: { id } });
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Failed to delete menu item" });
	}
};

export { getMenuByID, getAllMenuItems, updateMenuById, deleteMenuById };
