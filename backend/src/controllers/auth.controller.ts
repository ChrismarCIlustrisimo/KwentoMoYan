import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.services";


export const signup = async (req: Request, res: Response) => {
    try {
        const {name, username, password } = req.body;
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