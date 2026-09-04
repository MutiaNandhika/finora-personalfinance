import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TransactionWithCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Skeleton } from "@/components/ui/skeleton";

interface HighestExpensesListProps {
  transactions: TransactionWithCategory[];
  isLoading?: boolean;
}

export function HighestExpensesList({
  transactions,
  isLoading = false,
}: HighestExpensesListProps) {
  const highestExpenses = transactions
    .filter((tx) => tx.type === "expense")
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, 5);

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Highest Individual Expenses</CardTitle>
        <CardDescription className="text-xs">
          Largest single transactions in ledger
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between py-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        ) : highestExpenses.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            No expense records found.
          </p>
        ) : (
          <div className="divide-y divide-border/40">
            {highestExpenses.map((tx, idx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between py-2.5 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span className="text-[11px] font-bold text-muted-foreground w-4">
                    #{idx + 1}
                  </span>
                  <CategoryIcon
                    iconName={tx.category?.icon}
                    color={tx.category?.color}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{tx.title}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {tx.category?.name || "Uncategorized"} • {formatDate(tx.transaction_date)}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-rose-600 dark:text-rose-400">
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
