import { Router } from "express";
import { createNewPost, getAllPosts, getUsersPosts, viewUserPost, updateUserPost, deleteUserPost } from "../controllers/story.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.post("/create", authMiddleware, createNewPost);
router.get("/getAllPost", authMiddleware, getAllPosts);
router.get("/getUserPosts", authMiddleware, getUsersPosts);
router.get("/posts/:story_id", authMiddleware, viewUserPost);
router.put("/update/:story_id", authMiddleware, updateUserPost);
router.delete("/delete/:story_id", authMiddleware, deleteUserPost);

export default router;