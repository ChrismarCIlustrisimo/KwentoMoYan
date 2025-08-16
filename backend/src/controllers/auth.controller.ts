import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.services";
import { PrismaClient } from '../generated/prisma'; // ✅ CORRECT (adjust path if needed)]
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
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

    const newUser = await registerUser(name, username, password);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};



export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
        }
        
        const user = await loginUser(username,password);

        // Generate JWT token
        const token = jwt.sign(
        { id: user.user_id, username: user.username }, // payload
        process.env.JWT_SECRET as string,          // secret key from .env
        { expiresIn: "1h" }                        // token expiry
        );

        // Send response (omit password for safety)
        const { password: _, ...safeUser } = user;

        res.status(200).json({
        message: "Login successful",
        token,
        user: safeUser,
        });

    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}