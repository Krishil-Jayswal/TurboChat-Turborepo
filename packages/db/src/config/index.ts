import { logger } from "@repo/logger";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const connectDB = async () => {
  try {
    let MONGO_URI = "";
    if (process.env.MONGO_URI) {
      MONGO_URI = process.env.MONGO_URI;
    } else {
      logger.warn(
        "Mongo URI is not specified in.env configuration. Falling back to default configuration.",
      );
      MONGO_URI = "mongodb://localhost:27017/turbochat";
    }

    logger.info("Connecting to Database");
    await mongoose.connect(MONGO_URI);
    logger.success("Database connected Successfully");
  } catch (error: any) {
    logger.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  }
};
