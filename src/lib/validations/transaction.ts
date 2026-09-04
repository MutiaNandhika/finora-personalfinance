import { z } from "zod";

export const transactionSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  amount: z
    .number({ invalid_type_error: "Amount must be a valid number" })
    .positive("Amount must be greater than 0")
    .max(10000000000, "Amount is too large"),
  type: z.enum(["income", "expense"], {
    required_error: "Please select a transaction type",
  }),
  category_id: z.string().min(1, "Please select a category"),
  transaction_date: z
    .string()
    .min(1, "Transaction date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
