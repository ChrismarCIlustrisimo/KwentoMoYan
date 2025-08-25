"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserInfo = exports.updateUserInfo = exports.getUserInfo = exports.getAllUserInfo = void 0;
const user_services_1 = require("../services/user.services");
// Get all users
const getAllUserInfo = async (req, res) => {
    try {
        const users = await (0, user_services_1.getAllUsers)();
        res.status(200).json({ message: "Users retrieved successfully", users });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};
exports.getAllUserInfo = getAllUserInfo;
// Get a single user by ID
const getUserInfo = async (req, res) => {
    try {
        const { user_id } = req.params;
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const user = await (0, user_services_1.getUserById)(userIdNumber);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", user });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};
exports.getUserInfo = getUserInfo;
// Update user
const updateUserInfo = async (req, res) => {
    try {
        const { user_id } = req.params; // ✅ get from params
        const { name, username } = req.body;
        if (!name || !username) {
            return res.status(400).json({ message: "Name and username are required" });
        }
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const updatedUser = await (0, user_services_1.updateUser)(userIdNumber, name, username);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};
exports.updateUserInfo = updateUserInfo;
const deleteUserInfo = async (req, res) => {
    try {
        const { user_id } = req.params;
        const checkExistingUser = await (0, user_services_1.getUserById)(parseInt(user_id, 10));
        if (!checkExistingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        const deletedUser = await (0, user_services_1.deleteUser)(userIdNumber);
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};
exports.deleteUserInfo = deleteUserInfo;
