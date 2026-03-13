import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain uppercase, lowercase, number and special character",
    ),
});
