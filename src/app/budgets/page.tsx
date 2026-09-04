"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { BudgetSummaryHeader } from "@/components/budgets/BudgetSummaryHeader";
import { BudgetCard } from "@/components/budgets/BudgetCard";
import { BudgetModal } from "@/components/budgets/BudgetModal";
import { DeleteBudgetDialog } from "@/components/budgets/DeleteBudgetDialog";
import { useBudgets } from "@/lib/queries/useBudgets";
import { BudgetWithProgress } from "@/types";
import { getCurrentMonth } from "@/lib/utils";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { Target } from "lucide-react";

export default function BudgetsPage() {
  const [activeMonth, setActiveMonth] = useState(getCurrentMonth());
  const { budgets, isLoading, isError, refetch } = useBudgets(activeMonth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBudget, setSelectedBudget] = useState<BudgetWithProgress | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleCreate = () => {
    setModalMode("create");
    setSelectedBudget(null);
    setIsModalOpen(true);
  };

  const handleEdit = (budget: BudgetWithProgress) => {
    setModalMode("edit");
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleDelete = (budget: BudgetWithProgress) => {
    setSelectedBudget(budget);
    setIsDeleteOpen(true);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Monthly Budgets"
        description="Set category spending ceilings to prevent overspending and grow savings."
      />

      {isError ? (
        <ErrorState
          title="Failed to load budgets"
          message="Could not retrieve monthly budget records. Please try again."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="space-y-6">
          {/* Month Selector & Aggregate Metrics Bar */}
          <BudgetSummaryHeader
            month={activeMonth}
            onMonthChange={setActiveMonth}
            budgets={budgets}
            onAddBudget={handleCreate}
          />

          {/* Budget Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5 space-y-4"
                >
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : budgets.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No budgets configured for this month"
              description="Start taking control of your expenses by setting spending targets for individual categories."
              actionLabel="Create First Budget"
              onAction={handleCreate}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budgets.map((b) => (
                <BudgetCard
                  key={b.id}
                  budget={b}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Budget Modal */}
      <BudgetModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
        initialData={selectedBudget}
        activeMonth={activeMonth}
      />

      {/* Delete Confirmation Modal */}
      <DeleteBudgetDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        budget={selectedBudget}
        activeMonth={activeMonth}
      />
    </AppLayout>
  );
}
