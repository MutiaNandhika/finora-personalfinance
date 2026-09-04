import React from "react";
import { TransactionWithCategory } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

interface TransactionStatsProps {
  transactions: TransactionWithCategory[];
}

export function TransactionStats({ transactions }: TransactionStatsProps) {
  let income = 0;
  let expense = 0;

  transactions.forEach((tx) => {
    const amt = Number(tx.amount);
    if (tx.type === "income") {
      income += amt;
    } else {
      expense += amt;
    }
  });

  const net = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-xs">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <ArrowDownLeft className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">Total Income</p>
          <p className="text-sm md:text-base font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(income)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-xs">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <ArrowUpRight className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">Total Expenses</p>
          <p className="text-sm md:text-base font-bold text-rose-600 dark:text-rose-400">
            {formatCurrency(expense)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-xs">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Wallet className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[11px] font-medium text-muted-foreground">Net Cashflow</p>
          <p
            className={`text-sm md:text-base font-bold ${
              net >= 0 ? "text-foreground" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {formatCurrency(net)}
          </p>
        </div>
      </div>
    </div>
  );
}
