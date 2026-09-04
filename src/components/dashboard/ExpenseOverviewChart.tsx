"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExpenseOverviewData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { BarChart3 } from "lucide-react";

interface ExpenseOverviewChartProps {
  data: ExpenseOverviewData[];
  isLoading?: boolean;
}

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function OverviewTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-xl">
        <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Income
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(payload[0]?.value)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Expense
            </span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              {formatCurrency(payload[1]?.value)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function ExpenseOverviewChart({ data, isLoading = false }: ExpenseOverviewChartProps) {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">("monthly");

  const hasData = data && data.some((d) => d.income > 0 || d.expense > 0);

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Expense & Income Overview</CardTitle>
          <CardDescription className="text-xs">
            Financial cashflow trend analysis
          </CardDescription>
        </div>
        <div className="inline-flex rounded-lg bg-muted p-1 text-xs">
          <button
            type="button"
            onClick={() => setTimeframe("weekly")}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              timeframe === "weekly"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("monthly")}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              timeframe === "monthly"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("yearly")}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              timeframe === "yearly"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Yearly
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {isLoading ? (
          <div className="h-[280px] w-full flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : !hasData ? (
          <div className="h-[280px] flex items-center justify-center">
            <EmptyState
              icon={BarChart3}
              title="No cashflow data yet"
              description="Add transactions to start seeing your income and expense trends."
              className="border-0 my-0 py-4"
            />
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="period"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `Rp${(val / 1000000).toFixed(0)}M`}
                />
                <Tooltip content={<OverviewTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#expenseGradient)"
                  name="Expense"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
