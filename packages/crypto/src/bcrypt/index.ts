import { logger } from "@repo/logger";
import bcrypt from "bcryptjs";

export const hash = (text: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedText = bcrypt.hashSync(text, salt);
    return hashedText;
  } catch (error: any) {
    logger.error(`Error in hashing ${text}: ${error.message}.`);
    throw error;
  }
};

export const compareHash = (originalText: string, hashedText: string) => {
  try {
    const match = bcrypt.compareSync(originalText, hashedText);
    return match;
  } catch (error: any) {
    logger.error(`Error in comparing hash ${hashedText}: ${error.message}.`);
    throw error;
  }
};
