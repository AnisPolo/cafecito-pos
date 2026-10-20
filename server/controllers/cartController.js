import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { getDiscount } from "../middleware/discountVerify.js";
import { generateOrderNumber } from "../utils/orderNumber.js";

const isAdmin = (req) => req.user.role === "admin";
// Admin ve todo; un cliente solo sus propios carritos.
const scope = (req) => (isAdmin(req) ? {} : { user: req.user._id });

export const createCart = async (req, res) => {
  try {
    const { items, store } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // precios reales desde la BD, nunca los del front
    const found = await Product.find({
      _id: { $in: items.map((i) => i.product) },
    });
    const priceById = new Map(found.map((p) => [String(p._id), p.price]));

    let subtotal = 0;
    for (const item of items) {
      const price = priceById.get(String(item.product));
      if (price === undefined) {
        return res.status(400).json({ message: "Invalid product in cart" });
      }
      subtotal += price * (item.quantity || 1);
    }

    const discount = req.discount;
    const totalPrice = Math.round(subtotal * (1 - discount / 100) * 100) / 100;

    // sin sesión (req.user vacío) el pedido se registra como invitado
    const isGuest = !req.user;

    // el número de referencia es único; si chocara con otro, se reintenta con uno nuevo
    let cart;
    for (let attempt = 1; !cart; attempt++) {
      try {
        cart = await Cart.create({
          user: isGuest ? undefined : req.user._id,
          isGuest,
          guestName: isGuest ? "Invitado" : undefined,
          orderNumber: generateOrderNumber(),
          items,
          totalPrice,
          store,
          discountApplied: discount,
        });
      } catch (error) {
        const duplicatedNumber = error.code === 11000 && error.keyPattern?.orderNumber;
        if (!duplicatedNumber || attempt >= 5) throw error;
      }
    }

    // la próxima compra ya tendrá el tramo nuevo; deja el campo del usuario al día
    // (los invitados no acumulan compras)
    if (!isGuest) {
      await User.findByIdAndUpdate(req.user._id, {
        discountPercentage: getDiscount(req.purchasesCount + 1),
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    console.log("Error creating cart:", error);
    res.status(500).json({ message: "failed to create cart" });
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find(scope(req)).populate("user", "name");
    res.status(200).json(carts);
  } catch (error) {
    console.log("Error getting carts:", error);
    res.status(500).json({ message: "failed to get carts" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      _id: req.params.id,
      ...scope(req),
    }).populate("user", "name");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error getting cart by id:", error);
    res.status(500).json({ message: "failed to get cart by id" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { products, totalPrice, store } = req.body;
    // Un cliente no puede reasignar el carrito ni cambiar su estado.
    const changes = isAdmin(req) ? req.body : { products, totalPrice, store };
    const cart = await Cart.findOneAndUpdate(
      { _id: req.params.id, ...scope(req) },
      changes,
      {
        new: true,
      },
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.log("Error updating cart:", error);
    res.status(500).json({ message: "failed to update cart" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({
      _id: req.params.id,
      ...scope(req),
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.log("Error deleting cart:", error);
    res.status(500).json({ message: "failed to delete cart" });
  }
};
