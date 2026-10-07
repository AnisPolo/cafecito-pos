import OrderHistory from "../models/OrderHistory.js";

export const createOrderHistory = async (req, res) => {
    try {
        const {user, cart, status} = req.body;
        const newOrderHistory = new OrderHistory({
            user,
            cart,
            status,
        });
        await newOrderHistory.save();
        res.status(201).json({ message: "Order history created successfully" });
    } catch (error) {
        console.log("Error creating order history:", error);
        res.status(500).json({ message: "failed to create order history" });
    }
};

export const getOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.find();
        res.status(200).json(orderHistory);
    } catch (error) {
        console.log("Error getting order history:", error);
        res.status(500).json({ message: "failed to get order history" });
    }
};

export const getOrderHistoryById = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.findById(req.params.id);
        res.status(200).json(orderHistory);
    } catch (error) {
        console.log("Error getting order history by id:", error);
        res.status(500).json({ message: "failed to get order history by id" });
    }
};

export const updateOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ message: "Order history updated successfully" });
    } catch (error) {
        console.log("Error updating order history:", error);
        res.status(500).json({ message: "failed to update order history" });
    }
};

export const deleteOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order history deleted successfully" });
    } catch (error) {
        console.log("Error deleting order history:", error);
        res.status(500).json({ message: "failed to delete order history" });
    }
};