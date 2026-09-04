"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CategoryBreakdownData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { PieChart as PieChartIcon } from "lucide-react";
import { CHART_COLORS } from "@/lib/constants";

interface ExpenseCategoryChartProps {
  data: CategoryBreakdownData[];
  isLoading?: boolean;
}

interface TooltipPayloadItem {
  payload: CategoryBreakdownData;
}

interface CategoryTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CategoryTooltip({ active, payload }: CategoryTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="rounded-xl border border-border bg-card p-2.5 shadow-xl text-xs">
        <p className="font-semibold text-foreground">{item.categoryName}</p>
        <p className="text-muted-foreground mt-0.5">
          {formatCurrency(item.amount)} ({item.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export function ExpenseCategoryChart({ data, isLoading = false }: ExpenseCategoryChartProps) {
  const hasData = data && data.length > 0;

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Expense by Category</CardTitle>
        <CardDescription className="text-xs">
          Spending breakdown for active period
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        {isLoading ? (
          <div className="h-[280px] w-full flex items-center justify-center">
            <Skeleton className="h-44 w-44 rounded-full" />
          </div>
        ) : !hasData ? (
          <div className="h-[280px] flex items-center justify-center">
            <EmptyState
              icon={PieChartIcon}
              title="No expense data"
              description="Record expense transactions to see your category breakdown."
              className="border-0 my-0 py-4"
            />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-[210px] w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CategoryTooltip />} />
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="categoryName"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.categoryId}`}
                        fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]}
                        stroke="hsl(var(--card))"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category breakdown legend list */}
            <div className="w-full sm:w-1/2 space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {data.slice(0, 5).map((item, index) => (
                <div
                  key={item.categoryId}
                  className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-0"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          item.color || CHART_COLORS[index % CHART_COLORS.length],
                      }}
                    />
                    <span className="text-foreground font-medium truncate">
                      {item.categoryName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-foreground">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
