import express from "express";
import { corsOptions, PORT } from "./config/constants.js";
import { logger } from "@repo/logger";
import { connectDB } from "@repo/db/config";
import V1Router from "./routes/v1/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(logger.request());

app.use("/api/v1", V1Router);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(PORT, async (err) => {
  if (err) {
    logger.error(`Error in starting server: ${err.message}.`);
    process.exit(1);
  }

  await connectDB();

  logger.info(`Server started at port ${PORT}`);
});
