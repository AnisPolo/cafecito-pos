import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "failed to get products" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {name, category, price, milk, size, whippedCream, image, flavor} = req.body;

    if(!name || !price || !category || !milk || !size){
      return res.status(400).json({message: "Please provide name, price, category, milk, and size"});
    }

    const newProduct = new Product({
      name,
      category,
      price,
      milk,
      size,
      whippedCream,
      image,
      flavor,
    });
 
    await newProduct.save();
    res.status(201).json({message: "product created successfully"});
  } catch (error) {
    res.status(500).json({ message: "failed to create product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "failed to get product by id" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({message: "product updated successfully"});
  } catch (error) {
    res.status(500).json({ message: "failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "product deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "failed to delete product" });
  }
};