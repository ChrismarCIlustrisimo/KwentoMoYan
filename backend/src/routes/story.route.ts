import { Router } from "express";
import { 
    createStory, 
    getStories, 
    getUserStories, 
    getStory, 
    updateStory, 
    deleteStory 
} from "../controllers/story.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createStory);                  // POST /stories
router.get("/", authMiddleware, getStories);                   // GET /stories
router.get("/user/:user_id", authMiddleware, getUserStories);  // GET /stories/user/:user_id
router.get("/:story_id", authMiddleware, getStory);            // GET /stories/:story_id
router.put("/:story_id", authMiddleware, updateStory);         // PUT /stories/:story_id
router.delete("/:story_id", authMiddleware, deleteStory);      // DELETE /stories/:story_id

export default router;
