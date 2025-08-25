"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUsers = async () => {
    return prisma.user.findMany();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (user_id) => {
    return prisma.user.findUnique({ where: { user_id } });
};
exports.getUserById = getUserById;
const updateUser = async (user_id, name, username) => {
    return prisma.user.update({
        where: { user_id },
        data: { name, username }
    });
};
exports.updateUser = updateUser;
const deleteUser = async (user_id) => {
    return prisma.user.delete({ where: { user_id } });
};
exports.deleteUser = deleteUser;
