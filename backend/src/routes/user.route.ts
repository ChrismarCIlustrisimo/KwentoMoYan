import { Router } from "express";
import { getAllUserInfo, getUserInfo, updateUserInfo, deleteUserInfo} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllUserInfo);                  // GET /users
router.get("/:user_id", authMiddleware, getUserInfo);           // GET /users/:user_id
router.put("/:user_id", authMiddleware, updateUserInfo);
router.delete("/:user_id", authMiddleware, deleteUserInfo);    // DELETE /users/:user_id

export default router;
