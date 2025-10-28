import express from "express";
import { getAllUsers, getUserByUsernameOrEmail, getUserById } from "../routControler/userController.js";
import isLogin from "../middleware/isLogin.js";

const router = express.Router();

router.get("/",isLogin,getAllUsers);

router.get("/search", getUserByUsernameOrEmail);

router.get("/:id", getUserById);

export default router;