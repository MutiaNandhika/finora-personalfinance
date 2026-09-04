"use client";

import React from "react";
import { BudgetWithProgress } from "@/types";
import { formatCurrency, formatMonthYear } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Target, AlertTriangle, ShieldCheck } from "lucide-react";

interface BudgetSummaryHeaderProps {
  month: string;
  onMonthChange: (newMonth: string) => void;
  budgets: BudgetWithProgress[];
  onAddBudget: () => void;
}

export function BudgetSummaryHeader({
  month,
  onMonthChange,
  budgets,
  onAddBudget,
}: BudgetSummaryHeaderProps) {
  const [yearStr, monthStr] = month.split("-");
  const currentDate = new Date(parseInt(yearStr, 10), parseInt(monthStr, 10) - 1, 1);

  const handlePrevMonth = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const y = prev.getFullYear();
    const m = String(prev.getMonth() + 1).padStart(2, "0");
    onMonthChange(`${y}-${m}`);
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const y = next.getFullYear();
    const m = String(next.getMonth() + 1).padStart(2, "0");
    onMonthChange(`${y}-${m}`);
  };

  let totalBudget = 0;
  let totalSpent = 0;

  budgets.forEach((b) => {
    totalBudget += Number(b.amount);
    totalSpent += Number(b.spent);
  });

  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage =
    totalBudget > 0 ? Number(((totalSpent / totalBudget) * 100).toFixed(1)) : 0;

  return (
    <div className="space-y-4">
      {/* Month Navigator & Add Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handlePrevMonth}
            className="h-9 w-9"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="px-3 py-1.5 rounded-lg border border-border bg-card text-center min-w-[150px]">
            <span className="text-sm font-bold text-foreground">
              {formatMonthYear(month)}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleNextMonth}
            className="h-9 w-9"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={onAddBudget} size="sm" className="font-semibold shadow-xs">
          <Target className="h-4 w-4 mr-1.5" />
          New Category Budget
        </Button>
      </div>

      {/* Aggregate Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-xs">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">Total Budget Limit</p>
            <p className="text-base font-bold text-foreground">{formatCurrency(totalBudget)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-xs">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">
              Total Spent ({overallPercentage}%)
            </p>
            <p className="text-base font-bold text-foreground">{formatCurrency(totalSpent)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-xs">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-muted-foreground">
              {totalRemaining >= 0 ? "Total Remaining" : "Total Deficit"}
            </p>
            <p
              className={`text-base font-bold ${
                totalRemaining >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              }`}
            >
              {formatCurrency(Math.abs(totalRemaining))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
