import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Calendar, Percent } from "lucide-react";

interface AnalyticsSummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  savings: number;
  savingsRate: number;
  averageDailyExpense: number;
  isLoading?: boolean;
}

export function AnalyticsSummaryCards({
  totalIncome,
  totalExpense,
  savings,
  savingsRate,
  averageDailyExpense,
  isLoading = false,
}: AnalyticsSummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border/80 bg-card/60 p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-7 w-32" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Net Savings</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(savings)}
          </p>
          <span className="text-[11px] text-muted-foreground">Income minus expenses</span>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Savings Rate</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Percent className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{savingsRate}%</p>
          <span className="text-[11px] text-muted-foreground">Of total earned income</span>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Avg. Daily Spend</span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <TrendingDown className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">
            {formatCurrency(averageDailyExpense)}
          </p>
          <span className="text-[11px] text-muted-foreground">Calculated daily burn rate</span>
        </CardContent>
      </Card>

      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Total Cash Flow</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Calendar className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">
            {formatCurrency(totalIncome + totalExpense)}
          </p>
          <span className="text-[11px] text-muted-foreground">Gross money moved</span>
        </CardContent>
      </Card>
    </div>
  );
}
