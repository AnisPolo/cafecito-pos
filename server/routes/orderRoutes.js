import express from "express";
import {createOrderHistory, getOrderHistory, getOrderHistoryById, updateOrderHistory, deleteOrderHistory} from "../controllers/orderHistoryController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use("/orderHistory", protect);

router.post("/orderHistory", createOrderHistory);
router.get("/orderHistory", getOrderHistory);
router.get("/orderHistory/:id", getOrderHistoryById);
router.put("/orderHistory/:id", requireRole("admin"), updateOrderHistory);
router.delete("/orderHistory/:id", requireRole("admin"), deleteOrderHistory);

export default router;
