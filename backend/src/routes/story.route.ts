import { Router } from "express";
import { createNewPost, getAllPosts } from "../controllers/story.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router();

router.post("/create", authMiddleware, createNewPost);
router.get("/getAllPost", authMiddleware, getAllPosts);

export default router;