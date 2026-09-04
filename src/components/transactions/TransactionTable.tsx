"use client";

import React, { useState } from "react";
import { TransactionWithCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { Edit2, Trash2, ReceiptText, ChevronLeft, ChevronRight } from "lucide-react";
import { TransactionCardMobile } from "./TransactionCardMobile";

interface TransactionTableProps {
  transactions: TransactionWithCategory[];
  isLoading?: boolean;
  onEdit: (tx: TransactionWithCategory) => void;
  onDelete: (tx: TransactionWithCategory) => void;
  onAddTransaction: () => void;
}

export function TransactionTable({
  transactions,
  isLoading = false,
  onEdit,
  onDelete,
  onAddTransaction,
}: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage) || 1;
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-4 space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon={ReceiptText}
        title="No transactions found"
        description="Try adjusting your search or filters, or add a new transaction to get started."
        actionLabel="Add Transaction"
        onAction={onAddTransaction}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card List (Visible below md) */}
      <div className="space-y-3 md:hidden">
        {paginatedTransactions.map((tx) => (
          <TransactionCardMobile
            key={tx.id}
            transaction={tx}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Desktop Table (Visible on md and above) */}
      <div className="hidden md:block rounded-xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-foreground">
              {paginatedTransactions.map((tx) => {
                const isIncome = tx.type === "income";

                return (
                  <tr
                    key={tx.id}
                    className="transition-colors hover:bg-muted/40 group"
                  >
                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(tx.transaction_date)}
                    </td>

                    {/* Description & Title */}
                    <td className="py-3.5 px-4 font-medium">
                      <div>
                        <span className="font-semibold text-foreground text-sm block">
                          {tx.title}
                        </span>
                        {tx.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {tx.description}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <CategoryIcon
                          iconName={tx.category?.icon}
                          color={tx.category?.color}
                          size="sm"
                        />
                        <span className="text-xs font-medium">
                          {tx.category?.name || "Uncategorized"}
                        </span>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge
                        variant={isIncome ? "success" : "destructive"}
                        className="text-[11px] font-medium"
                      >
                        {isIncome ? "Income" : "Expense"}
                      </Badge>
                    </td>

                    {/* Amount */}
                    <td
                      className={`py-3.5 px-4 text-right font-bold text-sm whitespace-nowrap ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-foreground"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onEdit(tx)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          aria-label="Edit transaction"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDelete(tx)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          aria-label="Delete transaction"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2 text-xs text-muted-foreground">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, transactions.length)} of{" "}
            {transactions.length} transactions
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-foreground px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
