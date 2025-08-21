import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.services";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'; // Adjust path if needed

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

    const user = await loginUser(username, password);

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
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};


// LOGOUT endpoint (destroys session)
export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // default session cookie name
    res.status(200).json({ message: "Logout successful" });
  });
};