import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/services/api";

export const CATEGORIES_KEY = ["categories"];

export function useCategories() {
  const query = useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });

  const incomeCategories = (query.data || []).filter((c) => c.type === "income");
  const expenseCategories = (query.data || []).filter((c) => c.type === "expense");

  return {
    ...query,
    categories: query.data || [],
    incomeCategories,
    expenseCategories,
  };
}
