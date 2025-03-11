import { Request, Response } from "express";
import {
  LoginSchema,
  RegisterSchemaL1,
  RegisterSchemaL2,
} from "@repo/zod-validation";
import { User } from "@repo/db/models";
import { compareHash, hash } from "@repo/crypto/bcrypt";
import { createToken } from "@repo/crypto/jwt";
import { cookie_name, maxAge } from "../config/constants.js";
import { logger } from "@repo/logger";

export const register = async (req: Request, res: Response) => {
  try {
    const validation1 = RegisterSchemaL1.safeParse(req.body);
    if (!validation1.success) {
      res.status(400).json({
        message: "Invalid registration data format.",
        error: validation1.error.format(),
      });
      return;
    }
    const validation2 = RegisterSchemaL2.safeParse(validation1.data);
    if (!validation2.success) {
      res.status(400).json({
        message: "Invalid registration data format.",
        error: validation2.error.format(),
      });
      return;
    }
    const { username, password } = validation2.data;

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      if (!existingUsername.profileSetup) {
        res.status(302).json({ message: "Profile setup is required." });
      } else {
        res.status(409).json({ message: "Username already taken." });
      }
      return;
    }
    const hashedPassword = hash(password);
    const user = await User.create({
      username,
      password: hashedPassword,
    });
    const token = createToken(user._id.toString(), maxAge);
    res.cookie(cookie_name, token, {
      maxAge,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id.toString(),
        username: user.username,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    logger.error(`Error in registering user: ${error}.`);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validation = LoginSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        message: "Invalid login data format.",
        error: validation.error.format(),
      });
      return;
    }
    const { username, password } = validation.data;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "Invalid username or password." });
      return;
    }
    const match = compareHash(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }
    const token = createToken(user._id.toString(), maxAge);
    res.cookie(cookie_name, token, {
      maxAge,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      message: "Logged in successfully.",
      user: {
        id: user._id.toString(),
        username: user.username,
        profileSetup: user.profileSetup,
        name: user.name,
        email: user.email,
        about: user.about,
        gender: user.gender,
        profile_pic: user.profile_pic,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error(`Error in logging user: ${error}.`);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie(cookie_name);
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    logger.error(`Error in logging out user: ${error}.`);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const id = req.user!;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    res.status(200).json({
      id: user._id.toString(),
      username: user.username,
      profileSetup: user.profileSetup,
      name: user.name,
      email: user.email,
      about: user.about,
      gender: user.gender,
      profile_pic: user.profile_pic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    logger.error(`Error in finding the current user: ${error}.`);
    res.status(500).json({ message: "Internal server error." });
  }
};
