import mongoose from "mongoose";
/*
{ 
"name": "Latte",
"category": "hot",
"price": 70,
"milk": ["full", "deslactosada"],
"size": ["small", "medium", "large"],
"whippedCream": false,
"image": "../public/images/latte.jpg",
"flavor": [""]
}
*/

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        category: {type: String, enum: ["cold", "hot", "pastry"], required: true},
        price: {type: Number, required: true, validate: (v) => v >= 0},
        milk: {type: [String], required: true},
        flavor: {type: [String],},
        size: {type: [String], required: true},
        whippedCream: {type: Boolean, default: false},
        image: {type: String},
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;