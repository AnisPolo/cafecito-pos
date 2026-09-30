import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export  default async function connectDB(uri = process.env.MONGODB_URI) {
    if (!uri) {
        throw new Error("Falta MONGODB_URI en el .env")
    }

    mongoose.set("strictQuery", true);

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,

    });

    const {host, name} = mongoose.connection;
    console.log(`MongoDB connected: ${host}/${name}`);
    return mongoose.connection;
}

export async function disconnectDB() {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
}

