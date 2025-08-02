import { Request, Response } from 'express';
import prisma from "../utils/prisma";

// Create a new restaurant
async function createNew(req: Request, res: Response) {
    try {
        const { name, description, ownerId, managerId } = req.body;
        const restaurant = await prisma.restaurant.create({
            data: {
                name,
                description,
                ownerId,
                managerId,
            },
        });
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create restaurant' });
    }
}

// Get all restaurants
async function getAll(req: Request, res: Response) {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include: {
                owner: true,
                manager: true,
                menuItems: true,
                orders: true,
                ratings: true,
            },
        });
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
}

// Get a single restaurant by ID
async function getRestaurant(req: Request, res: Response) {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: req.params.id },
            include: {
                owner: true,
                manager: true,
                menuItems: true,
                orders: true,
                ratings: true,
            },
        });
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
}

// Update a restaurant by ID
async function updateRestaurant(req: Request, res: Response) {
    try {
        const { name, description, ownerId, managerId } = req.body;
        const restaurant = await prisma.restaurant.update({
            where: { id: req.params.id },
            data: {
                name,
                description,
                ownerId,
                managerId,
            },
        });
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update restaurant' });
    }
}

// Delete a restaurant by ID
async function deleteRestaurant(req: Request, res: Response) {
    try {
        await prisma.restaurant.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
}

export { createNew, getAll, getRestaurant, updateRestaurant, deleteRestaurant };