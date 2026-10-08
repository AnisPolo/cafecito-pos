import express from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/product", getProducts);
router.get("/product/:id", getProductById);
router.post("/product", protect, requireRole("admin"), createProduct);
router.put("/product/:id", protect, requireRole("admin"), updateProduct);
router.delete("/product/:id", protect, requireRole("admin"), deleteProduct);

export default router;
