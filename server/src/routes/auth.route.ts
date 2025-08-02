import express from 'express'
import  { register, login, getAllUsers, getUser, getSelf }  from '../controllers/auth.controller'

const router = express.Router();

// common for all
router.post("/register", register );
router.post("/login", login);
router.get("/getSelf", getSelf);

// admin only
router.get("/getAll", getAllUsers);
router.get("/getUser/:id", getUser);

// manager only





export default router;