"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema, TransactionFormValues } from "@/lib/validations/transaction";
import { TransactionWithCategory } from "@/types";
import { useTransactions } from "@/lib/queries/useTransactions";
import { useCategories } from "@/lib/queries/useCategories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: TransactionWithCategory | null;
}

export function TransactionModal({
  open,
  onOpenChange,
  mode = "create",
  initialData,
}: TransactionModalProps) {
  const { createTransaction, updateTransaction, isCreating, isUpdating } = useTransactions();
  const { incomeCategories, expenseCategories } = useCategories();

  const todayStr = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      title: "",
      amount: "" as unknown as number,
      category_id: "",
      transaction_date: todayStr,
      description: "",
    },
  });

  const selectedType = useWatch({ control, name: "type" });
  const availableCategories = selectedType === "income" ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      reset({
        type: initialData.type,
        title: initialData.title,
        amount: Number(initialData.amount),
        category_id: initialData.category_id || "",
        transaction_date: initialData.transaction_date,
        description: initialData.description || "",
      });
    } else {
      reset({
        type: "expense",
        title: "",
        amount: undefined,
        category_id: expenseCategories[0]?.id || "",
        transaction_date: todayStr,
        description: "",
      });
    }
  }, [open, mode, initialData, todayStr, reset]);

  const handleTypeChange = (newType: "income" | "expense") => {
    setValue("type", newType);
    const targetCats = newType === "income" ? incomeCategories : expenseCategories;
    if (targetCats.length > 0) {
      setValue("category_id", targetCats[0].id);
    }
  };

  const onSubmit = async (values: TransactionFormValues) => {
    try {
      if (mode === "edit" && initialData) {
        await updateTransaction({
          id: initialData.id,
          payload: {
            title: values.title,
            amount: Number(values.amount),
            type: values.type,
            category_id: values.category_id,
            transaction_date: values.transaction_date,
            description: values.description || null,
          },
        });
      } else {
        await createTransaction({
          user_id: "",
          title: values.title,
          amount: Number(values.amount),
          type: values.type,
          category_id: values.category_id,
          transaction_date: values.transaction_date,
          description: values.description || null,
        });
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to submit transaction:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Transaction" : "Edit Transaction"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Record a new expense or income into your ledger."
              : "Update transaction details and category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={`py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedType === "expense"
                    ? "bg-card text-rose-600 dark:text-rose-400 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={`py-2 text-xs font-semibold rounded-md transition-all ${
                  selectedType === "income"
                    ? "bg-card text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Supermarket Groceries or Monthly Salary"
              {...register("title")}
              error={errors.title?.message}
            />
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Amount */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Amount (IDR) <span className="text-destructive">*</span>
              </label>
              <Input
                type="number"
                placeholder="e.g. 1500000"
                {...register("amount", { valueAsNumber: true })}
                error={errors.amount?.message}
              />
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Date <span className="text-destructive">*</span>
              </label>
              <Input
                type="date"
                {...register("transaction_date")}
                error={errors.transaction_date?.message}
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Category <span className="text-destructive">*</span>
            </label>
            <Select
              {...register("category_id")}
              error={errors.category_id?.message}
            >
              <option value="" disabled>
                Select a category
              </option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Description <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <Textarea
              placeholder="Add optional notes, tags, or merchant info..."
              rows={2}
              {...register("description")}
              error={errors.description?.message}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isCreating || isUpdating}
              className="font-semibold"
            >
              {mode === "create" ? "Save Transaction" : "Update Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
