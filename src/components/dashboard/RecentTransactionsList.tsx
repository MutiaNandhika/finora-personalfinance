import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TransactionWithCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ReceiptText } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

interface RecentTransactionsListProps {
  transactions: TransactionWithCategory[];
  isLoading?: boolean;
  onAddTransaction?: () => void;
}

export function RecentTransactionsList({
  transactions,
  isLoading = false,
  onAddTransaction,
}: RecentTransactionsListProps) {
  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
          <CardDescription className="text-xs">
            Latest financial activities
          </CardDescription>
        </div>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="pt-1">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-xl" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="No transactions yet"
            description="Start recording your daily expenses and income to track them here."
            actionLabel="Add Transaction"
            onAction={onAddTransaction}
            className="border-0 my-0 py-6"
          />
        ) : (
          <div className="divide-y divide-border/40">
            {transactions.map((tx) => {
              const isIncome = tx.type === "income";

              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-3 transition-colors hover:bg-muted/30 px-2 rounded-lg -mx-2"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <CategoryIcon
                      iconName={tx.category?.icon}
                      color={tx.category?.color}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-medium text-foreground truncate">
                        {tx.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span>{tx.category?.name || "Uncategorized"}</span>
                        <span>•</span>
                        <span>{formatDate(tx.transaction_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-xs md:text-sm font-semibold ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-foreground"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
