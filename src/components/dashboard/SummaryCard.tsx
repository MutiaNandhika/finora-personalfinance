import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      iconBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      accent: "text-foreground",
    },
    income: {
      iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-600 dark:text-emerald-400",
    },
    expense: {
      iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      accent: "text-rose-600 dark:text-rose-400",
    },
    savings: {
      iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      accent: "text-amber-600 dark:text-amber-400",
    },
  };

  const style = variantStyles[variant];

  if (isLoading) {
    return (
      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-9 rounded-xl" />
          </div>
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-3.5 w-28" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs transition-all hover:shadow-md hover:border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl border p-2",
              style.iconBg
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {formatCurrency(amount)}
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            {growth !== undefined && (
              <span
                className={cn(
                  "inline-flex items-center font-semibold gap-0.5",
                  growth >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {growth >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {Math.abs(growth)}%
              </span>
            )}
            <span className="text-muted-foreground text-[11px]">
              {subtitle || "vs previous period"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
