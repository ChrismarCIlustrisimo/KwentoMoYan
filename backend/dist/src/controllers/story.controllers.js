"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStory = exports.updateStory = exports.getStory = exports.getUserStories = exports.getStories = exports.createStory = void 0;
const story_services_1 = require("../services/story.services");
// Create new story
const createStory = async (req, res) => {
    try {
        const { title, content, genre } = req.body;
        if (!title || !content || !genre) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // 👈 CHANGE: require session user
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // 👈 CHANGE: always take user_id from session, not request body
        const userId = req.session.user.user_id;
        const newPost = await (0, story_services_1.createPost)(userId, title, content, genre);
        res.status(201).json({
            message: "Post created successfully",
            post: newPost,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.createStory = createStory;
// Get all stories (public)
const getStories = async (req, res) => {
    try {
        const posts = await (0, story_services_1.getAllUserPosts)();
        res.status(200).json({ message: "Posts retrieved successfully", posts });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.getStories = getStories;
// Get stories by logged-in user
const getUserStories = async (req, res) => {
    try {
        // 👈 CHANGE: require session user
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // 👈 CHANGE: ignore req.params.user_id → always use session
        const userId = req.session.user.user_id;
        const posts = await (0, story_services_1.getUserPosts)(userId);
        res.status(200).json({ message: "User posts retrieved successfully", posts });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.getUserStories = getUserStories;
// Get single story (public)
const getStory = async (req, res) => {
    try {
        const { story_id } = req.params;
        if (!story_id) {
            return res.status(400).json({ message: "Story ID is required" });
        }
        const storyIdNumber = parseInt(story_id, 10);
        if (isNaN(storyIdNumber)) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }
        const post = await (0, story_services_1.viewPost)(storyIdNumber);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post retrieved successfully", post });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.getStory = getStory;
// Update story (only owner can update)
const updateStory = async (req, res) => {
    try {
        const { story_id } = req.params;
        const { title, content, genre } = req.body;
        if (!story_id) {
            return res.status(400).json({ message: "Story ID is required" });
        }
        // 👈 CHANGE: require session user
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const storyIdNumber = parseInt(story_id, 10);
        if (isNaN(storyIdNumber)) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }
        // 👈 CHANGE: enforce ownership
        const post = await (0, story_services_1.viewPost)(storyIdNumber);
        if (!post || post.user_id !== req.session.user.user_id) {
            return res.status(403).json({ message: "Forbidden: Not your story" });
        }
        const updated = await (0, story_services_1.updatePost)(storyIdNumber, { title, content, genre });
        res.status(200).json({ message: "Post updated successfully", post: updated });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.updateStory = updateStory;
// Delete story (only owner can delete)
const deleteStory = async (req, res) => {
    try {
        const { story_id } = req.params;
        if (!story_id) {
            return res.status(400).json({ message: "Story ID is required" });
        }
        // 👈 CHANGE: require session user
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const storyIdNumber = parseInt(story_id, 10);
        if (isNaN(storyIdNumber)) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }
        // 👈 CHANGE: enforce ownership
        const post = await (0, story_services_1.viewPost)(storyIdNumber);
        if (!post || post.user_id !== req.session.user.user_id) {
            return res.status(403).json({ message: "Forbidden: Not your story" });
        }
        const deleted = await (0, story_services_1.deletePost)(storyIdNumber);
        res.status(200).json({ message: "Post deleted successfully", post: deleted });
    }
    catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "Unknown error" });
    }
};
exports.deleteStory = deleteStory;
