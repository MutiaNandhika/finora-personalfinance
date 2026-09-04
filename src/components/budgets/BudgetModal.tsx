"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { budgetSchema, BudgetFormValues } from "@/lib/validations/budget";
import { BudgetWithProgress } from "@/types";
import { useBudgets } from "@/lib/queries/useBudgets";
import { useCategories } from "@/lib/queries/useCategories";
import { getCurrentMonth } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface BudgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  initialData?: BudgetWithProgress | null;
  activeMonth?: string;
}

export function BudgetModal({
  open,
  onOpenChange,
  mode = "create",
  initialData,
  activeMonth = getCurrentMonth(),
}: BudgetModalProps) {
  const { createBudget, updateBudget, isCreating, isUpdating } = useBudgets(activeMonth);
  const { expenseCategories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category_id: "",
      amount: "" as unknown as number,
      month: activeMonth,
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      reset({
        category_id: initialData.category_id,
        amount: Number(initialData.amount),
        month: initialData.month,
      });
    } else {
      reset({
        category_id: expenseCategories[0]?.id || "",
        amount: undefined,
        month: activeMonth,
      });
    }
  }, [open, mode, initialData, activeMonth, reset]);


  const onSubmit = async (values: BudgetFormValues) => {
    try {
      if (mode === "edit" && initialData) {
        await updateBudget({
          id: initialData.id,
          payload: {
            category_id: values.category_id,
            amount: Number(values.amount),
            month: values.month,
          },
        });
      } else {
        await createBudget({
          user_id: "",
          category_id: values.category_id,
          amount: Number(values.amount),
          month: values.month,
        });
      }
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save budget:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Category Budget" : "Edit Category Budget"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Set a spending limit for an expense category in a given month."
              : "Adjust your target budget limit."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Expense Category <span className="text-destructive">*</span>
            </label>
            <Select
              {...register("category_id")}
              error={errors.category_id?.message}
            >
              <option value="" disabled>
                Select category
              </option>
              {expenseCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Monthly Budget Limit (IDR) <span className="text-destructive">*</span>
            </label>
            <Input
              type="number"
              placeholder="e.g. 2000000"
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount?.message}
            />
          </div>

          {/* Month */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Budget Month (YYYY-MM) <span className="text-destructive">*</span>
            </label>
            <Input
              type="month"
              {...register("month")}
              error={errors.month?.message}
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
              {mode === "create" ? "Create Budget" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
