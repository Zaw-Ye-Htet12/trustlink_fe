import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Please enter your valid email format" }),
  password: z
    .string({ message: "Password must not be empty" })
    .min(6, "password required at least 6 character"),
});

export type LoginType = z.infer<typeof loginSchema>;
