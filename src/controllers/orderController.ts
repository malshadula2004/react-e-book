const Order = require("../models/Order");

// @desc    Create new order with Card Payment Simulation
// @route   POST /api/orders
const addOrderItems = async (req, res, next) => {
    // Frontend එකෙන් එවන cardDetails ද මෙතැනදී ලබා ගනී
    const { books, total, cardDetails } = req.body;
    
    try {
        if (!books || books.length === 0) {
            res.status(400);
            return next(new Error("No books in order"));
        }

        // 🛡️ බැංකු කාඩ්පත් විස්තර සත්‍යාපනය (Card Validation Simulation)
        if (!cardDetails || !cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
            res.status(400);
            return next(new Error("Invalid Card Number! අංක 16 ක් තිබිය යුතුය."));
        }
        if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
            res.status(400);
            return next(new Error("Invalid CVV Number!"));
        }

        // 💳 කාඩ්පත නිවැරදි නිසා සාර්ථක ලෙස Order එක "completed" තත්ත්වයෙන් සෑදීම
        const order = new Order({
            user: req.user._id, // protect middleware එකෙන් ලැබෙන පරිශීලකයා
            books, // Frontend එකෙන් එන [bookId1, bookId2] ඇරේ එක කෙලින්ම සේව් වේ
            total,
            status: "completed" // 👈 සල්ලි කැපුනු නිසා කෙලින්ම completed වේ
        });

        const createdOrder = await order.save();
        
        // Frontend එකට response එකක් ලෙස success: true සහ transactionId එකක් අනුකරණය කර යවයි
        res.status(201).json({
            success: true,
            message: "Payment Successful & Order Placed! 🚀",
            transactionId: "TXN-" + Math.floor(100000 + Math.random() * 900000),
            createdOrder
        });

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