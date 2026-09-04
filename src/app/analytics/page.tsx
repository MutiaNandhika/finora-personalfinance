"use client";

import React, { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { AnalyticsSummaryCards } from "@/components/analytics/AnalyticsSummaryCards";
import { IncomeVsExpenseChart } from "@/components/analytics/IncomeVsExpenseChart";
import { ExpenseTrendChart } from "@/components/analytics/ExpenseTrendChart";
import { ExpenseCategoryChart } from "@/components/dashboard/ExpenseCategoryChart";
import { TopSpendingList } from "@/components/analytics/TopSpendingList";
import { HighestExpensesList } from "@/components/analytics/HighestExpensesList";
import { useTransactions } from "@/lib/queries/useTransactions";
import { TimeRangeFilter, CategoryBreakdownData } from "@/types";
import { calculatePercentage, calculateSavingsRate } from "@/lib/utils";
import { ErrorState } from "@/components/common/ErrorState";
import { CHART_COLORS } from "@/lib/constants";

export default function AnalyticsPage() {
  const { transactions, isLoading, isError, refetch } = useTransactions();
  const [timeRange, setTimeRange] = useState<TimeRangeFilter>("this_month");

  // Filter transactions according to selected time range
  const filteredData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const filtered = transactions.filter((tx) => {
      const txDate = new Date(tx.transaction_date);
      const txYear = txDate.getFullYear();
      const txMonth = txDate.getMonth();

      switch (timeRange) {
        case "this_month":
          return txYear === currentYear && txMonth === currentMonth;
        case "last_month": {
          const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
          return (
            txYear === lastMonthDate.getFullYear() &&
            txMonth === lastMonthDate.getMonth()
          );
        }
        case "last_3_months": {
          const threeMonthsAgo = new Date(currentYear, currentMonth - 2, 1);
          return txDate >= threeMonthsAgo && txDate <= now;
        }
        case "this_year":
          return txYear === currentYear;
        case "all_time":
        default:
          return true;
      }
    });

    let totalIncome = 0;
    let totalExpense = 0;
    const categoryExpenseMap = new Map<string, { categoryName: string; color: string; icon: string; amount: number; count: number }>();

    filtered.forEach((tx) => {
      const amt = Number(tx.amount);
      if (tx.type === "income") {
        totalIncome += amt;
      } else {
        totalExpense += amt;
        if (tx.category) {
          const catId = tx.category.id;
          const curr = categoryExpenseMap.get(catId);
          if (curr) {
            curr.amount += amt;
            curr.count += 1;
          } else {
            categoryExpenseMap.set(catId, {
              categoryName: tx.category.name,
              color: tx.category.color || "#6366F1",
              icon: tx.category.icon,
              amount: amt,
              count: 1,
            });
          }
        }
      }
    });

    const savings = Math.max(0, totalIncome - totalExpense);
    const savingsRate = calculateSavingsRate(totalIncome, totalExpense);

    // Days count in active range for daily average
    let daysCount = 30;
    if (timeRange === "this_month") daysCount = now.getDate() || 1;
    else if (timeRange === "last_3_months") daysCount = 90;
    else if (timeRange === "this_year") daysCount = 365;

    const averageDailyExpense = daysCount > 0 ? Math.round(totalExpense / daysCount) : 0;

    // Category breakdown list
    const categoryBreakdown: CategoryBreakdownData[] = Array.from(categoryExpenseMap.entries()).map(
      ([catId, info], index) => ({
        categoryId: catId,
        categoryName: info.categoryName,
        color: info.color || CHART_COLORS[index % CHART_COLORS.length],
        icon: info.icon,
        amount: info.amount,
        percentage: totalExpense > 0 ? calculatePercentage(info.amount, totalExpense) : 0,
        transactionCount: info.count,
      })
    ).sort((a, b) => b.amount - a.amount);

    // Monthly comparisons (Last 6 months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyComparison: { period: string; income: number; expense: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - i, 1);
      const mStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const periodLabel = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

      let mIncome = 0;
      let mExpense = 0;

      transactions.forEach((tx) => {
        if (tx.transaction_date.startsWith(mStr)) {
          if (tx.type === "income") mIncome += Number(tx.amount);
          else mExpense += Number(tx.amount);
        }
      });

      monthlyComparison.push({
        period: periodLabel,
        income: mIncome,
        expense: mExpense,
      });
    }

    return {
      filtered,
      totalIncome,
      totalExpense,
      savings,
      savingsRate,
      averageDailyExpense,
      categoryBreakdown,
      monthlyComparison,
    };
  }, [transactions, timeRange]);

  return (
    <AppLayout>
      <PageHeader
        title="Financial Analytics"
        description="Deep-dive visual reports, category distributions, and spending trends."
        action={
          <div className="inline-flex rounded-lg bg-muted p-1 text-xs shrink-0 flex-wrap">
            <button
              onClick={() => setTimeRange("this_month")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                timeRange === "this_month"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeRange("last_month")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                timeRange === "last_month"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Last Month
            </button>
            <button
              onClick={() => setTimeRange("last_3_months")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                timeRange === "last_3_months"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Last 3 Months
            </button>
            <button
              onClick={() => setTimeRange("this_year")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                timeRange === "this_year"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              This Year
            </button>
            <button
              onClick={() => setTimeRange("all_time")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                timeRange === "all_time"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Time
            </button>
          </div>
        }
      />

      {isError ? (
        <ErrorState
          title="Error loading analytics"
          message="Could not load your analytics dataset. Please retry."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="space-y-6">
          {/* Top Summary Metrics */}
          <AnalyticsSummaryCards
            totalIncome={filteredData.totalIncome}
            totalExpense={filteredData.totalExpense}
            savings={filteredData.savings}
            savingsRate={filteredData.savingsRate}
            averageDailyExpense={filteredData.averageDailyExpense}
            isLoading={isLoading}
          />

          {/* Primary Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IncomeVsExpenseChart
              data={filteredData.monthlyComparison}
              isLoading={isLoading}
            />

            <ExpenseTrendChart
              data={filteredData.monthlyComparison.map((m) => ({
                period: m.period,
                expense: m.expense,
              }))}
              isLoading={isLoading}
            />
          </div>

          {/* Secondary Row: Category Donut, Top Spending & Highest Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ExpenseCategoryChart
                data={filteredData.categoryBreakdown}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-1">
              <TopSpendingList
                data={filteredData.categoryBreakdown}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-1">
              <HighestExpensesList
                transactions={filteredData.filtered}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
