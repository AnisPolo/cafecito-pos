import mongoose from "mongoose";
/*
{
  "user": "67666896002e3ea242f24f66",
  "cart": "67666d68015077a9167dbd1b",
  "status": "pending"
}
  no agregar status si no se necesita y se usa default
*/
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
