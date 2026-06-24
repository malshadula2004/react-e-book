const express = require("express");
const router = express.Router();
const { getBooks, createBook, updateBook, deleteBook } = require("../controllers/bookController");
const { protect, admin } = require("../middleware/authMiddleware");
router.route("/")
    .get(getBooks)
    .post(protect, admin, createBook); // Admin lock
router.route("/:id")
    .put(protect, admin, updateBook) // Admin lock
    .delete(protect, admin, deleteBook); // Admin lock
module.exports = router;
