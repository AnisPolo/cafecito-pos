import express from "express";
import { createCart, getCarts, getCartById, updateCart, deleteCart } from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use("/cart", protect);

router.post("/cart", createCart);
router.get("/cart", getCarts);
router.get("/cart/:id", getCartById);
router.put("/cart/:id", updateCart);
router.delete("/cart/:id", deleteCart);

export default router;
