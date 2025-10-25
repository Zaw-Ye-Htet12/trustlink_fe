import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  role: z.enum(["customer", "agent"]),
  phone: z.string().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
