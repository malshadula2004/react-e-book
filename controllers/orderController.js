const Order = require("../models/Order");

// @desc    Create new order
// @route   POST /api/orders
const addOrderItems = async (req, res, next) => {
    const { books, total } = req.body;
    try {
        if (!books || books.length === 0) {
            res.status(400);
            return next(new Error("No books in order"));
        }
        const order = new Order({
            user: req.user._id, // Got from protect middleware
            books,
            total
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("books", "title price");
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

module.exports = { addOrderItems, getMyOrders };