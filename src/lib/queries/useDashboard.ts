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

  return {
    ...query,
    data: query.data,
    stats: query.data?.stats,
    recentTransactions: query.data?.recentTransactions || [],
    budgetProgress: query.data?.budgetProgress || [],
    monthlyExpenseTrend: query.data?.monthlyExpenseTrend || [],
    expenseByCategory: query.data?.expenseByCategory || [],
  };
}
