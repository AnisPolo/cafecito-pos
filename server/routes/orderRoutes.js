import express from "express";
import {createOrderHistory, getOrderHistory, updateOrderHistory, deleteOrderHistory} from "../controllers/orderHistoryController.js";

const router = express.Router();

router.post("/orderHistory", createOrderHistory);
router.get("/orderHistory", getOrderHistory);
router.put("/orderHistory/:id", updateOrderHistory);
router.delete("/orderHistory/:id", deleteOrderHistory);

export default router;