import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";

export const DASHBOARD_KEY = ["dashboard"];

export function useDashboard() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: [...DASHBOARD_KEY, user?.id],
    queryFn: () => getDashboardData(user?.id),
  });

  const recentTransactions = useMemo(
    () => query.data?.recentTransactions || [],
    [query.data?.recentTransactions]
  );
  const budgetProgress = useMemo(
    () => query.data?.budgetProgress || [],
    [query.data?.budgetProgress]
  );
  const monthlyExpenseTrend = useMemo(
    () => query.data?.monthlyExpenseTrend || [],
    [query.data?.monthlyExpenseTrend]
  );
  const expenseByCategory = useMemo(
    () => query.data?.expenseByCategory || [],
    [query.data?.expenseByCategory]
  );

  return {
    ...query,
    data: query.data,
    stats: query.data?.stats,
    recentTransactions,
    budgetProgress,
    monthlyExpenseTrend,
    expenseByCategory,
  };
}

