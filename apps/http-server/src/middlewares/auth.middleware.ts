import { NextFunction, Request, Response } from "express";
import { cookie_name } from "../config/constants.js";
import { verifyToken } from "@repo/crypto/jwt";
import { logger } from "@repo/logger";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: string = req.cookies[cookie_name];
    if (!token) {
      res.status(401).json({ message: "No Token provided." });
      return;
    }

    const id = verifyToken(token);
    req.user = id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token expired." });
    logger.error(`Token expiration error ${error}.`);
  }
};
