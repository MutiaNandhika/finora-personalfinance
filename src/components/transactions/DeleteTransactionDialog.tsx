"use client";

import React from "react";
import { TransactionWithCategory } from "@/types";
import { useTransactions } from "@/lib/queries/useTransactions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface DeleteTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionWithCategory | null;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transaction,
}: DeleteTransactionDialogProps) {
  const { deleteTransaction, isDeleting } = useTransactions();

  if (!transaction) return null;

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaction.id);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to delete transaction:", error);
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
              <DialogTitle>Delete this transaction?</DialogTitle>
              <DialogDescription className="mt-1">
                This action cannot be undone and will permanently remove this record from your account ledger.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Transaction snapshot summary */}
        <div className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-1.5 my-2 text-xs">
          <div className="flex justify-between font-semibold text-foreground">
            <span>{transaction.title}</span>
            <span
              className={
                transaction.type === "income"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-foreground"
              }
            >
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground text-[11px]">
            <span>{transaction.category?.name || "Uncategorized"}</span>
            <span>{formatDate(transaction.transaction_date)}</span>
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
            Delete Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
