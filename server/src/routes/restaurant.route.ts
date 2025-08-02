// src/routes/restaurant.route.ts
import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { roleGuard } from "../middleware/roleGuard";
import {
	createNew,
	getAll,
	getRestaurant,
	updateRestaurant,
	deleteRestaurant,
} from "../controllers/restaurant.controller";

const router = Router();

router.post("/", roleGuard("ADMIN"), authenticate, createNew);
router.get("/", getAll);
router.get("/:id", authenticate, getRestaurant);
router.put(
	"/:id",
	roleGuard("ADMIN", "MANAGER"),
	authenticate,
	updateRestaurant
);
router.delete("/:id", roleGuard("ADMIN"), authenticate, deleteRestaurant);

export default router;
