require("dotenv").config(); // .env file eke thiyena variables load karaganna
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Routes import karaganiema
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Database eka connect kirima (config/db.js haraha)
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Frontend ekath ekka lesiyen connect wenna cors use kala

// API Routes Mapping
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

// Test Route (Root Route)
app.get("/", (req, res) => {
    res.send("E-Book Store Server Running Successfully...");
});

// Centralized Error Handling Middleware (Anivaaryen routes valata pasu liyanna)
app.use(errorHandler);

// Port eka .env eken gannවා, nethnam default 5000 gannawa
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});