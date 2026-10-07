import mongoose from "mongoose";

/*
{
  "user": "67666896002e3ea242f24f66", 
  "products": ["67666d68015077a9167dbd1b"],
  "totalPrice": 90, 
  "store": "Aguascalientes, zona centro",
  "status": "pending"
}
  no agregar store y status si no se necesita y se usa default
 */

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
        default: "Aguascalientes, zona centro"
    },
    status: {
        type: String,
        enum: ["pending", "ready", "served"],
        default: "pending",
    },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;