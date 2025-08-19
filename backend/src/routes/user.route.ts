import { Router } from "express";
import { getAllUserInfo, getUserInfo, updateUserInfo, deleteUserInfo} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getAllUserInfo);                  // GET /users
router.get("/:user_id", getUserInfo);           // GET /users/:user_id
router.put("/:user_id", updateUserInfo);
router.delete("/:user_id", deleteUserInfo);    // DELETE /users/:user_id

export default router;
