import express from "express";
import { createCart, getCarts, getCartById, updateCart, deleteCart } from "../controllers/cartController.js";
import { protect, optionalAuth } from "../middleware/auth.js";
import { discountVerify } from "../middleware/discountVerify.js";

const router = express.Router();

// Crear un pedido es público (invitado o con sesión); el resto exige login.
router.post("/cart", optionalAuth, discountVerify, createCart);
router.get("/cart", protect, getCarts);
router.get("/cart/:id", protect, getCartById);
router.put("/cart/:id", protect, updateCart);
router.delete("/cart/:id", protect, deleteCart);

export default router;
