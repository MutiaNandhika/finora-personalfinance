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
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xl text-xs">
        <p className="font-black text-[#1E293B] dark:text-white mb-2">{label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
              Income
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(payload[0]?.value)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
              Expense
            </span>
            <span className="font-extrabold text-rose-600 dark:text-rose-400">
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
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
            CASHFLOW TRENDS
          </span>
          <h3 className="text-lg font-black tracking-tight text-[#1E293B] dark:text-white">
            Expense & Income Overview
          </h3>
          <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
            Financial cashflow trend analysis
          </p>
        </div>

        {/* Pill Segmented Controls */}
        <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1 text-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe("weekly")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              timeframe === "weekly"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-[#64748B] dark:text-slate-400 hover:text-[#1E293B] dark:hover:text-white"
            }`}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("monthly")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              timeframe === "monthly"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-[#64748B] dark:text-slate-400 hover:text-[#1E293B] dark:hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("yearly")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              timeframe === "yearly"
                ? "bg-[#2563EB] text-white shadow-sm"
                : "text-[#64748B] dark:text-slate-400 hover:text-[#1E293B] dark:hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="pt-2">
        {isLoading ? (
          <div className="h-[280px] w-full flex items-center justify-center">
            <Skeleton className="h-full w-full rounded-2xl" />
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
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis
                  dataKey="period"
                  stroke="#94A3B8"
                  fontSize={11}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `Rp${(val / 1000000).toFixed(0)}M`}
                />
                <Tooltip content={<OverviewTooltip />} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#incomeGradient)"
                  name="Income"
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#expenseGradient)"
                  name="Expense"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
