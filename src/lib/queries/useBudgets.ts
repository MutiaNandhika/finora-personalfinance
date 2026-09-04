import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBudgetsWithProgress,
  createBudget,
  updateBudget,
  deleteBudget,
} from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";
import { Budget } from "@/types";
import { getCurrentMonth } from "@/lib/utils";
import { toast } from "sonner";

export const BUDGETS_KEY = ["budgets"];

export function useBudgets(month: string = getCurrentMonth()) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...BUDGETS_KEY, user?.id, month],
    queryFn: () => getBudgetsWithProgress(month, user?.id),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Omit<Budget, "id" | "created_at" | "updated_at">) =>
      createBudget(payload, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGETS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Budget created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create budget");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Omit<Budget, "id" | "user_id" | "created_at" | "updated_at">>;
    }) => updateBudget(id, payload, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGETS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Budget updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update budget");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBudget(id, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGETS_KEY });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Budget deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete budget");
    },
  });

  return {
    ...query,
    budgets: query.data || [],
    createBudget: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateBudget: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteBudget: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
