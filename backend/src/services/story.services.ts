import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a story
export const createPost = async (user_id: number, title: string, content: string, genre: string) => {
    try {
        return await prisma.story.create({
            data: { user_id, title, content, genre }
        });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};

// Get all stories (with user info)
export const getAllUserPosts = async () => {
    try {
        return await prisma.story.findMany({
            include: {
                user: {
                    select: { user_id: true, name: true }
                }
            }
        });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};

// Get stories by user
export const getUserPosts = async (user_id: number) => {
    try {
        return await prisma.story.findMany({ where: { user_id } });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};

// Get single story
export const viewPost = async (story_id: number) => {
    try {
        return await prisma.story.findUnique({ where: { story_id } });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};

// Update story
export const updatePost = async (
  story_id: number,
  data: { title?: string; content?: string; genre?: string }
) => {
  const result = await prisma.story.updateMany({
    where: { story_id },
    data,
  });

  if (result.count === 0) {
    throw new Error("Story not found");
  }

  return prisma.story.findUnique({ where: { story_id } });
};



// Delete story
export const deletePost = async (story_id: number) => {
    try {
        return await prisma.story.delete({ where: { story_id } });
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};
