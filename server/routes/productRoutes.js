import express from "express";
import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/product", getProducts);
router.get("/product", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;


