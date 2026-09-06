import React from "react";
import { formatCurrency, cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  growth?: number;
  subtitle?: string;
  variant?: "default" | "income" | "expense" | "savings";
  isLoading?: boolean;
}

export function SummaryCard({
  title,
  amount,
  icon: Icon,
  growth,
  subtitle,
  variant = "default",
  isLoading = false,
}: SummaryCardProps) {
  const variantStyles = {
    default: {
      iconBg: "bg-blue-100 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400 shadow-blue-500/10",
    },
    income: {
      iconBg: "bg-emerald-100 text-[#10B981] dark:bg-emerald-950/60 dark:text-emerald-400 shadow-emerald-500/10",
    },
    expense: {
      iconBg: "bg-rose-100 text-[#F43F5E] dark:bg-rose-950/60 dark:text-rose-400 shadow-rose-500/10",
    },
    savings: {
      iconBg: "bg-amber-100 text-[#D97706] dark:bg-amber-950/60 dark:text-amber-400 shadow-amber-500/10",
    },
  };

  const style = variantStyles[variant];

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-xl" />
        </div>
        <Skeleton className="h-7 w-32 rounded-lg" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between overflow-hidden min-w-0">
      <div className="flex items-center justify-between gap-2 mb-3 min-w-0">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400 truncate">
          {title}
        </span>
        <div
          className={cn(
            "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl shrink-0 shadow-2xs transition-transform group-hover:scale-105",
            style.iconBg
          )}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <div className="space-y-1 min-w-0">
        <h3
          className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight text-[#1E293B] dark:text-white truncate"
          title={formatCurrency(amount)}
        >
          {formatCurrency(amount)}
        </h3>

        <div className="flex items-center gap-1.5 text-xs flex-wrap min-w-0 pt-0.5">
          {growth !== undefined && (
            <span
              className={cn(
                "inline-flex items-center font-extrabold gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] shrink-0",
                growth >= 0
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800"
              )}
            >
              {growth >= 0 ? (
                <TrendingUp className="h-2.5 w-2.5" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" />
              )}
              {Math.abs(growth)}%
            </span>
          )}
          <span className="text-[#64748B] dark:text-slate-400 text-[10.5px] font-medium truncate">
            {subtitle || "vs previous period"}
          </span>
        </div>
      </div>
    </div>
  );
}
