import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "ready", "served"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

export default OrderHistory;
