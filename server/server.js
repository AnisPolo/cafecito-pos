import express from "express";
import connectDB from "./config/db.js";
import indexRoutes from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api", indexRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

