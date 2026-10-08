import connectDB, { disconnectDB } from "../config/db.js";
import Product from "../models/Product.js";
import { menu } from "./menu.js";

await connectDB();
await Product.deleteMany();
await Product.insertMany(menu);
console.log("Productos cargados exitosamente");
await disconnectDB();
