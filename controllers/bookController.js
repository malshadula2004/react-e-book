const Book = require("../models/Book");

// @desc    Get all books
// @route   GET /api/books
const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a book (Admin Only)
// @route   POST /api/books
const createBook = async (req, res, next) => {
    const { title, author, price, pdfUrl } = req.body;
    try {
        const book = new Book({ title, author, price, pdfUrl });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a book (Admin Only)
// @route   PUT /api/books/:id
const updateBook = async (req, res, next) => {
    const { title, author, price, pdfUrl } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.price = price || book.price;
            book.pdfUrl = pdfUrl || book.pdfUrl;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404);
            next(new Error("Book not found"));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a book (Admin Only)
// @route   DELETE /api/books/:id
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: "Book removed successfully" });
        } else {
            res.status(404);
            next(new Error("Book not found"));
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };