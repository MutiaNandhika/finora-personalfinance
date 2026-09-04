"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ExpenseTrendChartProps {
  data: { period: string; expense: number }[];
  isLoading?: boolean;
}

interface TooltipPayloadItem {
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function ExpenseTrendTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-2.5 shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        <p className="text-rose-600 dark:text-rose-400 font-bold">
          Expense: {formatCurrency(payload[0]?.value)}
        </p>
      </div>
    );
  }
  return null;
}

export function ExpenseTrendChart({ data, isLoading = false }: ExpenseTrendChartProps) {
  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Monthly Expense Trend</CardTitle>
        <CardDescription className="text-xs">
          Historical spending trajectory
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="h-[280px] w-full flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Tooltip content={<ExpenseTrendTooltip />} />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#EF4444", strokeWidth: 2, stroke: "hsl(var(--card))" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
