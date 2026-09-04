import { z } from "zod";

export const budgetSchema = z.object({
  category_id: z.string().min(1, "Please select a category"),
  amount: z
    .number({ invalid_type_error: "Budget amount must be a number" })
    .positive("Budget amount must be greater than 0")
    .max(10000000000, "Amount is too large"),
  month: z
    .string()
    .min(1, "Month is required")
    .regex(/^\d{4}-\d{2}$/, "Invalid month format (YYYY-MM)"),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
