import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "url";
import { logger } from "@repo/logger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getJWTSecret = () => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  logger.warn(
    "JWT Secret is not specified in .env configuration. Falling back to default configuration.",
  );

  return "JWT_SECRET";
};

export const JWT_SECRET = getJWTSecret();
