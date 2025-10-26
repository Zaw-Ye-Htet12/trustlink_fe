// src/validations/customer/profile.ts
import { z } from "zod";

export const customerProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name too long"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),
  email: z.string().email("Invalid email address"),
  phone_no: z
    .string()
    .min(6, "Phone number must be at least 6 characters")
    .optional()
    .or(z.literal("")), // Allow empty string
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address too long"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .optional()
    .or(z.literal("")), // Allow empty string
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  profile_photo_url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type CustomerProfileFormData = z.infer<typeof customerProfileSchema>;
