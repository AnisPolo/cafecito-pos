import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        validate: (v) => v >= 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    store: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "ready", "served"],
        default: "pending",
    },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;