import { logger } from "@repo/logger";
import dotenv from "dotenv";

dotenv.config();

const getPort = () => {
  if (process.env.PORT) {
    return parseInt(process.env.PORT);
  }

  logger.warn(
    "Port is not specified in .env configuration. Falling back to default configuration.",
  );
  return 3000;
};

export const PORT = getPort();

const getCorsOptions = () => {
  const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

  if (process.env.CLIENT_URL) {
    corsOptions.origin = process.env.CLIENT_URL;
    return corsOptions;
  }

  logger.warn(
    "Client URL is not specified in .env configuration. Falling back to default confguration.",
  );
  corsOptions.origin = "http://localhost:5173";
  return corsOptions;
};

export const corsOptions = getCorsOptions();

const getMaxAge = () => {
  if (process.env.MAX_AGE) {
    return parseInt(process.env.MAX_AGE);
  }

  logger.warn(
    "Max age for cookie is not specfied in .env configuration. Falling back to default confguration.",
  );
  return 7 * 24 * 60 * 60 * 1000;
};

export const maxAge = getMaxAge();

export const cookie_name = "turbo_token";
