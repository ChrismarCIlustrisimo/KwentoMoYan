import { PrismaClient } from '../generated/prisma'; // ✅ CORRECT (adjust path if needed)
import bcrypt from "bcryptjs";


const prisma = new PrismaClient();

export const registerUser = async (name: string, username: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
        data: {
            name,
            username,
            password: hashedPassword,
        }
    });
}


export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user; 
};