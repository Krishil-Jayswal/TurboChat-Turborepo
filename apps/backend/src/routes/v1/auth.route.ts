import express from "express";
import {
  login,
  logout,
  me,
  register,
} from "../../controllers/auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/logout", logout);

authRouter.get("/me", authMiddleware, me);

export default authRouter;
