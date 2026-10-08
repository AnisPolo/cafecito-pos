import Cart from "../models/Cart.js";

const isAdmin = (req) => req.user.role === "admin";
// Admin ve todo; un cliente solo sus propios carritos.
const scope = (req) => (isAdmin(req) ? {} : { user: req.user._id });

export const createCart = async(req,res)=>{
    try{
        const {products, totalPrice, date, store} = req.body;
        const admin = isAdmin(req);
        const newCart = new Cart({
            user: admin && req.body.user ? req.body.user : req.user._id,
            products,
            totalPrice,
            date,
            store,
            status: admin ? req.body.status : undefined,
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
        const carts = await Cart.find(scope(req)).populate("user", "name");
        res.status(200).json(carts);
    } catch (error) {
        console.log("Error getting carts:", error);
        res.status(500).json({message: "failed to get carts"});
    }
};

export const getCartById = async(req,res)=>{
    try{
        const cart = await Cart.findOne({_id: req.params.id, ...scope(req)}).populate("user", "name");
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error getting cart by id:", error);
        res.status(500).json({message: "failed to get cart by id"});
    }
};

export const updateCart = async(req,res)=>{
    try{
        const {products, totalPrice, store} = req.body;
        // Un cliente no puede reasignar el carrito ni cambiar su estado.
        const changes = isAdmin(req) ? req.body : {products, totalPrice, store};
        const cart = await Cart.findOneAndUpdate({_id: req.params.id, ...scope(req)}, changes, {
            new: true,
        });
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json({message: "Cart updated successfully"});
    } catch (error) {
        console.log("Error updating cart:", error);
        res.status(500).json({message: "failed to update cart"});
    }
};

export const deleteCart = async(req,res)=>{
    try{
        const cart = await Cart.findOneAndDelete({_id: req.params.id, ...scope(req)});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json({message: "Cart deleted successfully"});
    } catch (error) {
        console.log("Error deleting cart:", error);
        res.status(500).json({message: "failed to delete cart"});
    }
};
