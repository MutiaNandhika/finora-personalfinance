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
      pillBg: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    income: {
      iconBg: "bg-emerald-100 text-[#10B981] dark:bg-emerald-950/60 dark:text-emerald-400 shadow-emerald-500/10",
      pillBg: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    expense: {
      iconBg: "bg-rose-100 text-[#F43F5E] dark:bg-rose-950/60 dark:text-rose-400 shadow-rose-500/10",
      pillBg: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
    },
    savings: {
      iconBg: "bg-amber-100 text-[#D97706] dark:bg-amber-950/60 dark:text-amber-400 shadow-amber-500/10",
      pillBg: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    },
  };

  const style = variantStyles[variant];

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-11 w-11 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-36 rounded-lg" />
        <Skeleton className="h-3.5 w-28 rounded-md" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
          {title}
        </span>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl shadow-xs transition-transform group-hover:scale-110",
            style.iconBg
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E293B] dark:text-white">
          {formatCurrency(amount)}
        </h3>

        <div className="flex items-center gap-2 text-xs flex-wrap">
          {growth !== undefined && (
            <span
              className={cn(
                "inline-flex items-center font-extrabold gap-1 px-2 py-0.5 rounded-full text-[11px]",
                growth >= 0
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800"
              )}
            >
              {growth >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(growth)}%
            </span>
          )}
          <span className="text-[#64748B] dark:text-slate-400 text-[11px] font-medium">
            {subtitle || "vs previous period"}
          </span>
        </div>
      </div>
    </div>
  );
}
