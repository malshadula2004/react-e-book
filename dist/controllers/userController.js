"use strict";
const User = require("../model/user");
// Create user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Get all users
const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
// Get by ID
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
};
// Update
const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user);
};
// Delete
const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
};
module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
