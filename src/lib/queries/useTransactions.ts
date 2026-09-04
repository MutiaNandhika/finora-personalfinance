import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";
import { Transaction, TransactionWithCategory, TransactionFiltersState } from "@/types";
import { toast } from "sonner";

export const TRANSACTIONS_KEY = ["transactions"];

export function useTransactions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...TRANSACTIONS_KEY, user?.id],
    queryFn: () => getTransactions(user?.id),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Omit<Transaction, "id" | "created_at" | "updated_at">) =>
      createTransaction(payload, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("Transaction added successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create transaction");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Omit<Transaction, "id" | "user_id" | "created_at" | "updated_at">>;
    }) => updateTransaction(id, payload, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("Transaction updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update transaction");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      toast.success("Transaction deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete transaction");
    },
  });

  // Client-side filtering & sorting helper
  const filterTransactions = (
    transactionsList: TransactionWithCategory[],
    filters: TransactionFiltersState
  ) => {
    return transactionsList
      .filter((tx) => {
        // Search filter
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchTitle = tx.title.toLowerCase().includes(q);
          const matchDesc = tx.description ? tx.description.toLowerCase().includes(q) : false;
          const matchCategory = tx.category ? tx.category.name.toLowerCase().includes(q) : false;
          if (!matchTitle && !matchDesc && !matchCategory) return false;
        }

        // Type filter
        if (filters.type !== "all" && tx.type !== filters.type) {
          return false;
        }

        // Category filter
        if (filters.categoryId && filters.categoryId !== "all") {
          if (tx.category_id !== filters.categoryId) return false;
        }

        // Date range filter
        if (filters.startDate && tx.transaction_date < filters.startDate) {
          return false;
        }
        if (filters.endDate && tx.transaction_date > filters.endDate) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "newest":
            return new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
          case "oldest":
            return new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime();
          case "highest":
            return Number(b.amount) - Number(a.amount);
          case "lowest":
            return Number(a.amount) - Number(b.amount);
          default:
            return 0;
        }
      });
  };

  return {
    ...query,
    transactions: query.data || [],
    createTransaction: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateTransaction: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteTransaction: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    filterTransactions,
  };
}
