import { z } from "zod";

export const RegisterSchemaL1 = z.strictObject({
  username: z
    .string()
    .min(6, { message: "Username must be atleast 6 characters long" })
    .max(255, { message: "Username cannot cannot exceed 255 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" }),
});

export const RegisterSchemaL2 = z.strictObject({
  username: z.string().regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  }),
  password: z
    .string()
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" }),
});

export const LoginSchema = z.strictObject({
  username: z
    .string()
    .min(6, { message: "Invalid username or password" })
    .max(255, { message: "Invalid username or password" }),
  password: z
    .string()
    .min(6, { message: "Invalid username or password" })
    .max(20, { message: "Invalid username or password" }),
});
