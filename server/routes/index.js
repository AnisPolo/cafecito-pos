import express from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();

router.use("/", productRoutes);
router.use("/", userRoutes);
router.use("/", cartRoutes);
router.use("/", orderRoutes);

export default router;