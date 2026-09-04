import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BudgetWithProgress } from "@/types";
import { formatCurrency, formatMonthYear, getCurrentMonth } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Target, AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

interface BudgetOverviewWidgetProps {
  budgets: BudgetWithProgress[];
  isLoading?: boolean;
  onAddBudget?: () => void;
}

export function BudgetOverviewWidget({
  budgets,
  isLoading = false,
  onAddBudget,
}: BudgetOverviewWidgetProps) {
  const currentMonthStr = formatMonthYear(getCurrentMonth());

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Budget Overview</CardTitle>
          <CardDescription className="text-xs">
            {currentMonthStr} active category budgets
          </CardDescription>
        </div>
        <Link
          href="/budgets"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Manage
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>

      <CardContent className="pt-1">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 py-1">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        ) : budgets.length === 0 ? (
          <EmptyState
            icon={Target}
            title="No budgets set"
            description="Create monthly category budgets to keep your expenses under control."
            actionLabel="Create Budget"
            onAction={onAddBudget}
            className="border-0 my-0 py-6"
          />
        ) : (
          <div className="space-y-4">
            {budgets.map((b) => {
              const isExceeded = b.status === "exceeded";
              const isWarning = b.status === "warning";

              let progressColor = "bg-primary";
              let badgeColor = "text-muted-foreground";

              if (isExceeded) {
                progressColor = "bg-rose-500";
                badgeColor = "text-rose-600 dark:text-rose-400 font-semibold";
              } else if (isWarning) {
                progressColor = "bg-amber-500";
                badgeColor = "text-amber-600 dark:text-amber-400 font-semibold";
              }

              return (
                <div key={b.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <CategoryIcon
                        iconName={b.category?.icon}
                        color={b.category?.color}
                        size="sm"
                      />
                      <span className="font-medium text-foreground truncate">
                        {b.category?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-muted-foreground">
                        {formatCurrency(b.spent)} / {formatCurrency(b.amount)}
                      </span>
                      <span className={badgeColor}>{b.percentage}%</span>
                    </div>
                  </div>

                  <Progress
                    value={b.percentage}
                    indicatorColor={progressColor}
                    className="h-2"
                  />

                  {isExceeded && (
                    <p className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium pt-0.5">
                      <AlertCircle className="h-3 w-3" /> Budget exceeded by{" "}
                      {formatCurrency(Math.abs(b.remaining))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
