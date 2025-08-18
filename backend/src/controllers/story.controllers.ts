import { Request, Response } from "express";
import { createPost } from "../services/story.services";
import { PrismaClient } from '@prisma/client'; // Adjust path if needed

const prisma = new PrismaClient();

export const createNewPost = async (req: Request, res: Response) => {
    try {
        const { user_id, title, content, genre } = req.body;

        if(!user_id || !title || !content || !genre) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPost = await createPost(user_id, title, content, genre);
        res.status(201).json({ message: "Post created successfully", post: newPost });  

    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}