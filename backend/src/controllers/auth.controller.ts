import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.services";
import { PrismaClient } from '../generated/prisma'; // ✅ CORRECT (adjust path if needed)

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
    try {
        const {name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if username is already taken
        const existingUser = await prisma.user.findUnique({
        where: { username },
    });


        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const newUser = await registerUser(name, username, password);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await loginUser(username,password);
        res.status(200).json({ message: "Login successful", user });


    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}