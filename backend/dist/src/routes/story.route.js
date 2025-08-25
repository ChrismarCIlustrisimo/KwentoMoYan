"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const story_controllers_1 = require("../controllers/story.controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authMiddleware, story_controllers_1.createStory); // POST /stories
router.get("/", authMiddleware_1.authMiddleware, story_controllers_1.getStories); // GET /stories
router.get("/user/:user_id", authMiddleware_1.authMiddleware, story_controllers_1.getUserStories); // GET /stories/user/:user_id
router.get("/:story_id", authMiddleware_1.authMiddleware, story_controllers_1.getStory); // GET /stories/:story_id
router.put("/:story_id", authMiddleware_1.authMiddleware, story_controllers_1.updateStory); // PUT /stories/:story_id
router.delete("/:story_id", authMiddleware_1.authMiddleware, story_controllers_1.deleteStory); // DELETE /stories/:story_id
exports.default = router;
