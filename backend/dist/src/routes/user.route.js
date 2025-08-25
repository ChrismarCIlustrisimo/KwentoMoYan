"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.authMiddleware, user_controller_1.getAllUserInfo); // GET /users
router.get("/:user_id", authMiddleware_1.authMiddleware, user_controller_1.getUserInfo); // GET /users/:user_id
router.put("/:user_id", authMiddleware_1.authMiddleware, user_controller_1.updateUserInfo);
router.delete("/:user_id", authMiddleware_1.authMiddleware, user_controller_1.deleteUserInfo); // DELETE /users/:user_id
exports.default = router;
