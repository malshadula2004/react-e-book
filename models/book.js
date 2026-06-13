const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true, default: 0.0 },
    pdfUrl: { type: String, required: true } // Link to cloud storage or local path
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);