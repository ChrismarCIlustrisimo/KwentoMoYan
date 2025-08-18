import { Router } from "express";
import { createNewPost } from "../controllers/story.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createNewPost);

export default router;