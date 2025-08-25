"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const auth_services_1 = require("../services/auth.services");
const client_1 = require("@prisma/client"); // Adjust path if needed
const prisma = new client_1.PrismaClient();
const signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });
        const existingName = await prisma.user.findUnique({
            where: { name },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        if (existingName) {
            return res.status(400).json({ message: "Name already taken" });
        }
        const newUser = await (0, auth_services_1.registerUser)(name, username, password);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password required" });
        }
        const user = await (0, auth_services_1.loginUser)(username, password);
        // Create session on the server
        req.session.user = {
            user_id: user.user_id,
            username: user.username,
        };
        // Remove password before sending
        const { password: _, ...safeUser } = user;
        res.status(200).json({
            message: "Login successful",
            user: safeUser,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
exports.login = login;
// LOGOUT endpoint (destroys session)
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to log out" });
        }
        res.clearCookie("connect.sid"); // default session cookie name
        res.status(200).json({ message: "Logout successful" });
    });
};
exports.logout = logout;
