"use strict";
const express = require("express");
const router = express.Router();
const { addOrderItems, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
router.route("/")
    .post(protect, addOrderItems); // User must be logged in
router.route("/myorders")
    .get(protect, getMyOrders); // User must be logged in
module.exports = router;
