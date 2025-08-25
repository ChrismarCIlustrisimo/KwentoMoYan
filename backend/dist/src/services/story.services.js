"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.viewPost = exports.getUserPosts = exports.getAllUserPosts = exports.createPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a story
const createPost = async (user_id, title, content, genre) => {
    try {
        return await prisma.story.create({
            data: { user_id, title, content, genre }
        });
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};
exports.createPost = createPost;
// Get all stories (with user info)
const getAllUserPosts = async () => {
    try {
        return await prisma.story.findMany({
            include: {
                user: {
                    select: { user_id: true, name: true }
                }
            }
        });
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};
exports.getAllUserPosts = getAllUserPosts;
// Get stories by user
const getUserPosts = async (user_id) => {
    try {
        return await prisma.story.findMany({ where: { user_id } });
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};
exports.getUserPosts = getUserPosts;
// Get single story
const viewPost = async (story_id) => {
    try {
        return await prisma.story.findUnique({ where: { story_id } });
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};
exports.viewPost = viewPost;
// Update story
const updatePost = async (story_id, data) => {
    const result = await prisma.story.updateMany({
        where: { story_id },
        data,
    });
    if (result.count === 0) {
        throw new Error("Story not found");
    }
    return prisma.story.findUnique({ where: { story_id } });
};
exports.updatePost = updatePost;
// Delete story
const deletePost = async (story_id) => {
    try {
        return await prisma.story.delete({ where: { story_id } });
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};
exports.deletePost = deletePost;
