import express from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/", productRoutes);
router.use("/", userRoutes);

export default router;