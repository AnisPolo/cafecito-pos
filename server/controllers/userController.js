import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generatePassword = async (password) => {
  const salt = 10;
  return await bcrypt.hash(password, salt);
};

const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

// Registro público: siempre crea un cliente sin descuento.
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    const hashPassword = await generatePassword(password);
    await User.create({ name, email, password: hashPassword, role: "client", discountPercentage: 0 });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.log("Error registering user:", error);
    res.status(500).json({ message: "failed to register user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    const valid = user && (await bcrypt.compare(password, user.password));
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role, discountPercentage: user.discountPercentage },
    });
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ message: "failed to login" });
  }
};

// Alta por un admin: puede fijar rol y descuento.
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, discountPercentage } = req.body;
    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    const hashPassword = await generatePassword(password);
    await User.create({
      name,
      email,
      password: hashPassword,
      role,
      discountPercentage,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.log("Error creating user:", error);
    res.status(500).json({ message: "failed to create user" });
  }
};

const getUsers = async (req, res) => {
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
    const user = await User.findById(id).select("-password");
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

export {registerUser, loginUser, createUser, getUsers, getUserById, updateUserDiscount, deleteUser};
