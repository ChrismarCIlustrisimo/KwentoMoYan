"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const registerUser = async (name, username, password) => {
    const existingUser = await prisma.user.findUnique({
        where: { username },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    return await prisma.user.create({
        data: {
            name,
            username,
            password: hashedPassword,
        }
    });
};
exports.registerUser = registerUser;
const loginUser = async (username, password) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }
    return user;
};
exports.loginUser = loginUser;
