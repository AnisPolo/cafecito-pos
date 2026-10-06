import Cart from "../models/Cart.js";

export const createCart = async(req,res)=>{
    try{
        const {user, products, totalPrice, date, store, status} = req.body;
        const newCart = new Cart({
            user,
            products,
            totalPrice,
            date,
            store,
            status,
        });
        await newCart.save();
        res.status(201).json({message: "Cart created successfully"});
    } catch (error) {
        console.log("Error creating cart:", error);
        res.status(500).json({message: "failed to create cart"});
    }
};

export const getCarts = async(req,res)=>{
    try{
        const carts = await Cart.find().populate("user", "name");
        res.status(200).json(carts);
    } catch (error) {
        console.log("Error getting carts:", error);
        res.status(500).json({message: "failed to get carts"});
    }
};

export const getCartById = async(req,res)=>{
    try{
        const cart = await Cart.findById(req.params.id).populate("user", "name");
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error getting cart by id:", error);
        res.status(500).json({message: "failed to get cart by id"});
    }
};

export const updateCart = async(req,res)=>{
    try{
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({message: "Cart updated successfully"});
    } catch (error) {
        console.log("Error updating cart:", error);
        res.status(500).json({message: "failed to update cart"});
    }
};

export const deleteCart = async(req,res)=>{
    try{
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Cart deleted successfully"});
    } catch (error) {
        console.log("Error deleting cart:", error);
        res.status(500).json({message: "failed to delete cart"});
    }
};

