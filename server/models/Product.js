import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        category: {type: String, enum: ["cold", "hot", "pastry"], required: true},
        price: {type: Number, required: true, validate: (v) => v >= 0},
        milk: {type: String, enum: ["full","oat","soy","almond","without"]},
        flavor: {type: String, enum: [""]},
        size: {type: String, enum: ["small", "medium", "large"]},
        whippedCream: {type: Boolean},
        image: {type: String},
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;