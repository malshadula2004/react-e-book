"use strict";
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }, // පොතේ පින්තූර ලින්ක් එක
    pdfUrl: { type: String, required: true }, // ඇත්තම PDF එකේ ලින්ක් එක
    genre: { type: String, default: "General" }
}, { timestamps: true }); // මෙයින් පොත ඇතුළත් කරපු වෙලාව auto හැදෙනවා
module.exports = mongoose.model("Book", bookSchema);
