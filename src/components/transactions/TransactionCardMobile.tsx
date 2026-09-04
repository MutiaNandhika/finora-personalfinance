import React from "react";
import { TransactionWithCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit2, Trash2 } from "lucide-react";

interface TransactionCardMobileProps {
  transaction: TransactionWithCategory;
  onEdit: (tx: TransactionWithCategory) => void;
  onDelete: (tx: TransactionWithCategory) => void;
}

export function TransactionCardMobile({
  transaction,
  onEdit,
  onDelete,
}: TransactionCardMobileProps) {
  const isIncome = transaction.type === "income";

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <CategoryIcon
            iconName={transaction.category?.icon}
            color={transaction.category?.color}
            size="md"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {transaction.title}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
              <span>{transaction.category?.name || "Uncategorized"}</span>
              <span>•</span>
              <span>{formatDate(transaction.transaction_date)}</span>
            </div>
          </div>
        </div>

        <Badge variant={isIncome ? "success" : "destructive"} className="shrink-0 text-[10px]">
          {isIncome ? "Income" : "Expense"}
        </Badge>
      </div>

      {transaction.description && (
        <p className="text-xs text-muted-foreground bg-muted/40 p-2 rounded-lg">
          {transaction.description}
        </p>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-border/50">
        <span
          className={`text-base font-bold ${
            isIncome ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(transaction)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Edit transaction"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(transaction)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            aria-label="Delete transaction"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
