"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ExpenseOverviewChart } from "@/components/dashboard/ExpenseOverviewChart";
import { ExpenseCategoryChart } from "@/components/dashboard/ExpenseCategoryChart";
import { RecentTransactionsList } from "@/components/dashboard/RecentTransactionsList";
import { BudgetOverviewWidget } from "@/components/dashboard/BudgetOverviewWidget";
import { TransactionModal } from "@/components/transactions/TransactionModal";
import { BudgetModal } from "@/components/budgets/BudgetModal";
import { SeedDemoDataModal } from "@/components/settings/SeedDemoDataModal";
import { useDashboard } from "@/lib/queries/useDashboard";
import { ErrorState } from "@/components/common/ErrorState";
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  PiggyBank,
  Utensils,
  Car,
  Home,
  ShoppingBag,
  HeartPulse,
  Plane,
  Briefcase,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const {
    stats,
    recentTransactions,
    budgetProgress,
    monthlyExpenseTrend,
    expenseByCategory,
    isLoading,
    isError,
    refetch,
  } = useDashboard();

  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isSeedOpen, setIsSeedOpen] = useState(false);

  const quickCategories = [
    { name: "Food & Dining", icon: Utensils, bg: "bg-blue-100 text-[#2563EB] dark:bg-blue-950/60 dark:text-blue-400" },
    { name: "Transportation", icon: Car, bg: "bg-emerald-100 text-[#10B981] dark:bg-emerald-950/60 dark:text-emerald-400" },
    { name: "Housing & Bills", icon: Home, bg: "bg-purple-100 text-[#8B5CF6] dark:bg-purple-950/60 dark:text-purple-400" },
    { name: "Shopping", icon: ShoppingBag, bg: "bg-pink-100 text-[#EC4899] dark:bg-pink-950/60 dark:text-pink-400" },
    { name: "Health", icon: HeartPulse, bg: "bg-orange-100 text-[#F97316] dark:bg-orange-950/60 dark:text-orange-400" },
    { name: "Travel & Trips", icon: Plane, bg: "bg-cyan-100 text-[#06B6D4] dark:bg-cyan-950/60 dark:text-cyan-400" },
    { name: "Salary & Income", icon: Briefcase, bg: "bg-amber-100 text-[#D97706] dark:bg-amber-950/60 dark:text-amber-400" },
  ];

  return (
    <AppLayout>
      {/* Dashboard Top Greeting & Header Actions */}
      <DashboardHeader
        onAddTransaction={() => setIsAddTxOpen(true)}
        onAddBudget={() => setIsAddBudgetOpen(true)}
        onSeedData={() => setIsSeedOpen(true)}
      />

      {isError ? (
        <ErrorState
          title="Failed to load dashboard data"
          message="Could not retrieve your financial records. Please check your database connection."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              title="Total Balance"
              amount={stats?.totalBalance || 0}
              icon={Wallet}
              variant="default"
              growth={stats?.incomeGrowth}
              subtitle="All-time ledger balance"
              isLoading={isLoading}
            />

            <SummaryCard
              title="Total Income"
              amount={stats?.totalIncome || 0}
              icon={ArrowDownLeft}
              variant="income"
              growth={12.4}
              subtitle="Accumulated revenue"
              isLoading={isLoading}
            />

            <SummaryCard
              title="Total Expenses"
              amount={stats?.totalExpense || 0}
              icon={ArrowUpRight}
              variant="expense"
              growth={-3.8}
              subtitle="Accumulated spending"
              isLoading={isLoading}
            />

            <SummaryCard
              title="Net Savings"
              amount={stats?.savings || 0}
              icon={PiggyBank}
              variant="savings"
              subtitle={`${stats?.savingsRate || 0}% overall savings rate`}
              isLoading={isLoading}
            />
          </div>

          {/* Category Quick Shortcut Strip */}
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
                  QUICK LOG
                </span>
                <span className="text-xs font-black text-[#1E293B] dark:text-white">
                  Categories
                </span>
              </div>
              <Link
                href="/transactions"
                className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-0.5"
              >
                Manage all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {quickCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setIsAddTxOpen(true)}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/80 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-700 transition-all cursor-pointer group hover:-translate-y-0.5"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 shadow-xs group-hover:scale-110 transition-transform ${cat.bg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold text-[#1E293B] dark:text-slate-200 text-center line-clamp-1">
                      {cat.name}
                    </span>
                  </button>
                );
              })}

              <Link
                href="/transactions"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all group hover:-translate-y-0.5"
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 shadow-xs group-hover:scale-110 transition-transform">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-400 text-center">
                  See all
                </span>
              </Link>
            </div>
          </div>

          {/* Charts Row: Cashflow Trends & Category Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ExpenseOverviewChart
                data={monthlyExpenseTrend}
                isLoading={isLoading}
              />
            </div>

            <div className="lg:col-span-1">
              <ExpenseCategoryChart
                data={expenseByCategory}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Bottom Row: Recent Transactions & Active Budget Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTransactionsList
              transactions={recentTransactions}
              isLoading={isLoading}
              onAddTransaction={() => setIsAddTxOpen(true)}
            />

            <BudgetOverviewWidget
              budgets={budgetProgress}
              isLoading={isLoading}
              onAddBudget={() => setIsAddBudgetOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Action Modals */}
      <TransactionModal
        open={isAddTxOpen}
        onOpenChange={setIsAddTxOpen}
        mode="create"
      />

      <BudgetModal
        open={isAddBudgetOpen}
        onOpenChange={setIsAddBudgetOpen}
        mode="create"
      />

      <SeedDemoDataModal
        open={isSeedOpen}
        onOpenChange={setIsSeedOpen}
      />
    </AppLayout>
  );
}
