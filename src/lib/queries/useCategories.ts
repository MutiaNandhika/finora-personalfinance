import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/services/api";

export const CATEGORIES_KEY = ["categories"];

export function useCategories() {
  const query = useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes cache
  });

  const categories = useMemo(() => query.data || [], [query.data]);
  const incomeCategories = useMemo(
    () => categories.filter((c) => c.type === "income"),
    [categories]
  );
  const expenseCategories = useMemo(
    () => categories.filter((c) => c.type === "expense"),
    [categories]
  );

  return {
    ...query,
    categories,
    incomeCategories,
    expenseCategories,
  };
}

