import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { logger } from "@repo/logger";

export const createToken = (id: string, maxAge: number) => {
  try {
    const token = jwt.sign({ id }, JWT_SECRET, { expiresIn: maxAge });

    return token;
  } catch (error: any) {
    logger.error(`Error in creating token: ${error.message}.`);
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      id?: string;
    };
    if (decoded.id) {
      return decoded.id;
    }
  } catch (error: any) {
    logger.error(`Error in veryfying token: ${error.message}.`);
    throw error;
  }
};
