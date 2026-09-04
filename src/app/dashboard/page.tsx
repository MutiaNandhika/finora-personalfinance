"use client";

import React, { useState } from "react";
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
import { Wallet, ArrowDownLeft, ArrowUpRight, PiggyBank } from "lucide-react";

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
        <>
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
        </>
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
