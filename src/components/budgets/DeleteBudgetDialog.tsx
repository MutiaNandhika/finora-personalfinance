"use client";

import React from "react";
import { BudgetWithProgress } from "@/types";
import { useBudgets } from "@/lib/queries/useBudgets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatMonthYear } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface DeleteBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget: BudgetWithProgress | null;
  activeMonth: string;
}

export function DeleteBudgetDialog({
  open,
  onOpenChange,
  budget,
  activeMonth,
}: DeleteBudgetDialogProps) {
  const { deleteBudget, isDeleting } = useBudgets(activeMonth);

  if (!budget) return null;

  const handleDelete = async () => {
    try {
      await deleteBudget(budget.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Delete this budget?</DialogTitle>
              <DialogDescription className="mt-1">
                Are you sure you want to remove the monthly limit for{" "}
                <span className="font-semibold text-foreground">{budget.category?.name}</span>?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-1 my-2 text-xs">
          <div className="flex justify-between font-semibold text-foreground">
            <span>Category</span>
            <span>{budget.category?.name}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Month</span>
            <span>{formatMonthYear(budget.month)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Limit</span>
            <span>{formatCurrency(budget.amount)}</span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="font-semibold"
          >
            Delete Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
