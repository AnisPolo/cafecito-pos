import bcrypt from "bcrypt";
import User from "../models/User.js";

const generatePassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, discountPercentage } = req.body;
    const hashPassword = await generatePassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
      discountPercentage,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ message: "failed to create user" });
  }
};

const getUsers = async (re, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting users:", error);
    res.status(500).json({ message: "failed to get users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error getting user by ID:", error);
    res.status(500).json({ message: "failed to get user by ID" });
  }
};

const updateUserDiscount = async(req,res)=>{
    try{
        const {id} = req.params;
        const {discountPercentage} = req.body;
        const user = await User.findByIdAndUpdate(id, {discountPercentage}, {new: true});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User discount updated successfully " + user.discountPercentage});
    } catch (error) {
        console.log("Error updating user discount:", error);
        res.status(500).json({message: "failed to update user discount"});
    }
};

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        console.log("Error deleting user:", error);
        res.status(500).json({message: "failed to delete user"});
    }
};

export {createUser, getUsers, getUserById, updateUserDiscount, deleteUser};
