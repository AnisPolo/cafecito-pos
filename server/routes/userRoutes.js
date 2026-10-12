import express from "express";
import {registerUser, loginUser, createUser, getUsers, getUserById, updateUserDiscount, deleteUser, getMe} from "../controllers/userController.js";
import {protect, requireRole, requireSelfOrAdmin} from "../middleware/auth.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.get("/user/me", protect, getMe);
router.get("/user/:id", protect, requireSelfOrAdmin, getUserById);

router.get("/user", protect, requireRole("admin"), getUsers);
router.post("/user", protect, requireRole("admin"), createUser);
router.put("/user/:id", protect, requireRole("admin"), updateUserDiscount);
router.delete("/user/:id", protect, requireRole("admin"), deleteUser);

export default router;
