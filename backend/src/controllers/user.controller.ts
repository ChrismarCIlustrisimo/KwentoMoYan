import { Response, Request } from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../services/user.services";

// Get all users
export const getAllUserInfo = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

// Get a single user by ID
export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userIdNumber = parseInt(user_id, 10);

        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const user = await getUserById(userIdNumber);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User retrieved successfully", user });

    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

// Update user
export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;   // ✅ get from params
        const { name, username } = req.body;

        if (!name || !username) {
            return res.status(400).json({ message: "Name and username are required" });
        }

        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userIdNumber = parseInt(user_id, 10);
        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const updatedUser = await updateUser(userIdNumber, name, username);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
};

export const deleteUserInfo = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;

        const checkExistingUser = await getUserById(parseInt(user_id, 10));

        if (!checkExistingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        if (!user_id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userIdNumber = parseInt(user_id, 10);

        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        const deletedUser = await deleteUser(userIdNumber);
        
        
 

        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : "An unknown error occurred" });
    }
}