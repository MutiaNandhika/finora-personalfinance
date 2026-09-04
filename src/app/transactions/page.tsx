"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { TransactionTable } from "@/components/transactions/TransactionTable";
import { TransactionFilters } from "@/components/transactions/TransactionFilters";
import { TransactionStats } from "@/components/transactions/TransactionStats";
import { TransactionModal } from "@/components/transactions/TransactionModal";
import { DeleteTransactionDialog } from "@/components/transactions/DeleteTransactionDialog";
import { useTransactions } from "@/lib/queries/useTransactions";
import { useCategories } from "@/lib/queries/useCategories";
import { TransactionWithCategory, TransactionFiltersState } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ErrorState } from "@/components/common/ErrorState";

const defaultFilters: TransactionFiltersState = {
  search: "",
  type: "all",
  categoryId: "all",
  startDate: "",
  endDate: "",
  sortBy: "newest",
};

export default function TransactionsPage() {
  const { transactions, isLoading, isError, refetch, filterTransactions } = useTransactions();
  const { categories } = useCategories();

  const [filters, setFilters] = useState<TransactionFiltersState>(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedTx, setSelectedTx] = useState<TransactionWithCategory | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const filteredTransactions = filterTransactions(transactions, filters);

  const handleCreate = () => {
    setModalMode("create");
    setSelectedTx(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tx: TransactionWithCategory) => {
    setModalMode("edit");
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  const handleDelete = (tx: TransactionWithCategory) => {
    setSelectedTx(tx);
    setIsDeleteOpen(true);
  };

  const handleFilterChange = (newFilters: Partial<TransactionFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Transactions Ledger"
        description="Comprehensive audit log of all financial inflows and outflows."
        action={
          <Button onClick={handleCreate} size="sm" className="font-semibold shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Transaction
          </Button>
        }
      />

      {isError ? (
        <ErrorState
          title="Error loading transactions"
          message="Could not load your transactions list. Please retry."
          onRetry={() => refetch()}
        />
      ) : (
        <div className="space-y-4">
          {/* Quick Metrics of Active / Filtered Transactions */}
          <TransactionStats transactions={filteredTransactions} />

          {/* Search, Type, Category, Date Range & Sort Filter Toolbar */}
          <TransactionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            onReset={handleResetFilters}
          />

          {/* Transactions List Table / Mobile Cards */}
          <TransactionTable
            transactions={filteredTransactions}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddTransaction={handleCreate}
          />
        </div>
      )}

      {/* Add / Edit Transaction Modal */}
      <TransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        mode={modalMode}
        initialData={selectedTx}
      />

      {/* Delete Confirmation Alert Dialog */}
      <DeleteTransactionDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        transaction={selectedTx}
      />
    </AppLayout>
  );
}
