declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      CLIENT_URL?: string;
      MAX_AGE?: string;
      NODE_ENV?: string;
    }
  }

  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export {};
