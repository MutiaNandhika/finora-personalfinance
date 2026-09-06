import React from "react";
import Link from "next/link";
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
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
            CATEGORY LIMITS
          </span>
          <h3 className="text-lg font-black tracking-tight text-[#1E293B] dark:text-white">
            Budget Overview
          </h3>
          <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
            {currentMonthStr} active category budgets
          </p>
        </div>

        <Link
          href="/budgets"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-xs font-bold text-[#475569] hover:text-[#2563EB] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors"
        >
          Manage
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="pt-1">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 py-1">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-28 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full" />
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

              let progressColor = "bg-[#2563EB]";
              let badgeBg = "bg-slate-100 dark:bg-slate-800 text-[#1E293B] dark:text-white";

              if (isExceeded) {
                progressColor = "bg-[#EF4444]";
                badgeBg = "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/60";
              } else if (isWarning) {
                progressColor = "bg-[#F59E0B]";
                badgeBg = "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/60";
              }

              return (
                <div key={b.id} className="space-y-2 p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CategoryIcon
                        iconName={b.category?.icon}
                        color={b.category?.color}
                        size="sm"
                      />
                      <span className="font-bold text-[#1E293B] dark:text-white truncate">
                        {b.category?.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-[#64748B] dark:text-slate-400 font-semibold text-[11px]">
                        {formatCurrency(b.spent)} / {formatCurrency(b.amount)}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${badgeBg}`}>
                        {b.percentage}%
                      </span>
                    </div>
                  </div>

                  <Progress
                    value={b.percentage}
                    indicatorColor={progressColor}
                    className="h-2 rounded-full bg-slate-100 dark:bg-slate-800"
                  />

                  {isExceeded && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 font-bold pt-0.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> Budget exceeded by{" "}
                      {formatCurrency(Math.abs(b.remaining))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
