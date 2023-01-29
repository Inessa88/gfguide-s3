import express from "express";
import {
    getUsers,
    register,
    login,
    logout,
    token,
} from "../controllers/Users.js";
import { VerifyToken } from "../middlewears/VerifyToken.js";

const router = express.Router();

router.get("/api/users", VerifyToken, getUsers);
router.post("/api/register", register);
router.post("/api/login", login);
router.delete("/api/logout", logout);
router.get("/api/token", VerifyToken, token);

export default router;
