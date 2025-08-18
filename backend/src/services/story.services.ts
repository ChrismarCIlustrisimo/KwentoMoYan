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