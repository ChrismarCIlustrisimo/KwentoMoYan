import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    return prisma.user.findMany();
};

export const getUserById = async (user_id: number) => {
    return prisma.user.findUnique({ where: { user_id } });
};

export const updateUser = async (user_id: number, name: string, username: string) => {
    return prisma.user.update({
        where: { user_id },
        data: { name, username }
    });
};

export const deleteUser = async (user_id: number) => {
    return prisma.user.delete({ where: { user_id } });
    
}