import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Full name must not exceed 60 characters"),
  currency: z.string().min(1, "Currency is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
