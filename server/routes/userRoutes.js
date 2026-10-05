import express from "express";
import {createUser, getUsers, getUserById, updateUserDiscount, deleteUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", createUser);
router.put("/user/:id", updateUserDiscount);
router.delete("/user/:id", deleteUser);

export default router;
