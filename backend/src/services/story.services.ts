import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPost = async (user_id: number, title: string, content: string, genre: string) => {
    
    try {
          return await prisma.story.create({
            data: {
                user_id,
                title,
                content,
                genre,
            }
        })

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const getAllPostsService = async () => {
    try {
        return await prisma.story.findMany({
            include: {
                user: {
                    select: {
                        user_id: true,
                        name: true,
                }
            }
        }
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}

export const getUserPosts = async (user_id: number) => {
    try {
        return await prisma.story.findMany({
            where: { user_id }
        })
    }catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
 }

 export const viewPost =  async (story_id: number) => {
    try {
        return await prisma.story.findUnique({
            where: { story_id: story_id }
        });
    }catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
 }

export const updatePost = async (
  story_id: number,
  data: { title?: string; content?: string; genre?: string }
) => {
  try {
    return await prisma.story.update({
      where: { story_id },
      data,
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};


export const deletePost = async (story_id: number) => {
    try {
        return await prisma.story.delete({
            where: { story_id: story_id }
        })
    }catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}