import OrderHistory from "../models/OrderHistory.js";
import Cart from "../models/Cart.js";

const isAdmin = (req) => req.user.role === "admin";
// Admin ve todo; un cliente solo sus propias órdenes.
const scope = (req) => (isAdmin(req) ? {} : { user: req.user._id });

export const createOrderHistory = async (req, res) => {
    try {
        const {cart} = req.body;
        const admin = isAdmin(req);

        // El carrito debe existir y pertenecer a quien crea la orden.
        const ownedCart = await Cart.findOne({_id: cart, ...scope(req)});
        if (!ownedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const newOrderHistory = new OrderHistory({
            user: ownedCart.user,
            cart,
            status: admin ? req.body.status : undefined,
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
        const orderHistory = await OrderHistory.find(scope(req));
        res.status(200).json(orderHistory);
    } catch (error) {
        console.log("Error getting order history:", error);
        res.status(500).json({ message: "failed to get order history" });
    }
};

export const getOrderHistoryById = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.findOne({_id: req.params.id, ...scope(req)});
        if (!orderHistory) {
            return res.status(404).json({ message: "Order history not found" });
        }
        res.status(200).json(orderHistory);
    } catch (error) {
        console.log("Error getting order history by id:", error);
        res.status(500).json({ message: "failed to get order history by id" });
    }
};

// Solo admin (ruta protegida): cambiar el estado de la orden.
export const updateOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.findByIdAndUpdate(req.params.id, {status: req.body.status}, {
            new: true,
            runValidators: true,
        });
        if (!orderHistory) {
            return res.status(404).json({ message: "Order history not found" });
        }
        res.status(200).json({ message: "Order history updated successfully" });
    } catch (error) {
        console.log("Error updating order history:", error);
        res.status(500).json({ message: "failed to update order history" });
    }
};

// Solo admin (ruta protegida).
export const deleteOrderHistory = async (req, res) => {
    try {
        const orderHistory = await OrderHistory.findByIdAndDelete(req.params.id);
        if (!orderHistory) {
            return res.status(404).json({ message: "Order history not found" });
        }
        res.status(200).json({ message: "Order history deleted successfully" });
    } catch (error) {
        console.log("Error deleting order history:", error);
        res.status(500).json({ message: "failed to delete order history" });
    }
};
