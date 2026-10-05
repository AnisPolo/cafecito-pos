import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, trim: true},
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String, enum:["admin", "client"],
            default: "client",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        discountPercentage: {
            type:Number,
            default:0,
            validate: {validator: (v) => v >= 0 && v <= 100, message: "El descuento debe estar entre 0 y 100"},
            required: true
        },

    }
);

const User = mongoose.model("User", userSchema);

export default User;