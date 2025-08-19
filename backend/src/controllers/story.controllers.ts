import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'; // Adjust path if needed
import { getAllPostsService, getUserPosts, viewPost,  createPost, updatePost, deletePost } from "../services/story.services"

const prisma = new PrismaClient();

export const createNewPost = async (req: Request, res: Response) => {
    try {
        const { user_id, title, content, genre } = req.body;

        if( !title || !content || !genre) {
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

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const getAllPosts = await getAllPostsService();
        res.status(200).json({ message: "Posts retrieved successfully", posts: getAllPosts });
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }   
    }
}

export const getUsersPosts = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const userIdNumber = parseInt(user_id as string, 10);
        
        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const getUsersPosts = await getUserPosts(userIdNumber);
        res.status(200).json({ message: "User posts retrieved successfully", posts: getUsersPosts });
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export const viewUserPost = async (req: Request, res: Response) => {
    try {
        const { story_id } = req.params;

        if (!story_id) {
            return res.status(400).json({ message: "Story ID is required" });
        }

        const storyIdNumber = parseInt(story_id, 10);

        if (isNaN(storyIdNumber)) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }

        const post = await viewPost(storyIdNumber);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // ✅ Send the post back
        return res.status(200).json({
            message: "Post retrieved successfully",
            post
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};


export const updateUserPost = async (req: Request, res: Response) => {
  try {
    const { story_id } = req.params;
    const { title, content, genre } = req.body;

    if (!story_id) {
      return res.status(400).json({ message: "Story ID is required" });
    }

    const storyIdNumber = parseInt(story_id, 10);
    if (isNaN(storyIdNumber)) {
      return res.status(400).json({ message: "Invalid Story ID" });
    }

    const updated = await updatePost(storyIdNumber, { title, content, genre });

    return res.status(200).json({
      message: "Post updated successfully",
      post: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const deleteUserPost = async (req: Request, res: Response) => {
    try {
        const { story_id } = req.params;

        if (!story_id) {
            return res.status(400).json({ message: "Story ID is required" });
        }
        const storyIdNumber = parseInt(story_id, 10);

        if (isNaN(storyIdNumber)) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }
        const deletedPost = await deletePost(storyIdNumber);
        return res.status(200).json({
            message: "Post deleted successfully",
            post: deletedPost,
        });
    }catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}