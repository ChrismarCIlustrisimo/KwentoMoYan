import { Request, Response } from "express";
import { 
    getAllUserPosts, 
    getUserPosts, 
    viewPost,  
    createPost, 
    updatePost, 
    deletePost 
} from "../services/story.services";

// Create new story
export const createStory = async (req: Request, res: Response) => {
    try {
        const { user_id, title, content, genre } = req.body;

        if (!title || !content || !genre) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newPost = await createPost(user_id, title, content, genre);
        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Get all stories
export const getStories = async (req: Request, res: Response) => {
    try {
        const posts = await getAllUserPosts();
        res.status(200).json({ message: "Posts retrieved successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Get stories by user
export const getUserStories = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const posts = await getUserPosts(userIdNumber);
        res.status(200).json({ message: "User posts retrieved successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Get single story
export const getStory = async (req: Request, res: Response) => {
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

        res.status(200).json({ message: "Post retrieved successfully", post });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Update story
export const updateStory = async (req: Request, res: Response) => {
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
        res.status(200).json({ message: "Post updated successfully", post: updated });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};

// Delete story
export const deleteStory = async (req: Request, res: Response) => {
    try {
        const { story_id } = req.params;

        if (!story_id) {
            return res.status(400).json({ message: "Story ID is required" });
        }

        const storyIdNumber = parseInt(story_id, 10);
        if (isNaN(storyIdNumber)) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }

        const deleted = await deletePost(storyIdNumber);
        res.status(200).json({ message: "Post deleted successfully", post: deleted });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
