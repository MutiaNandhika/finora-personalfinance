import { createClient } from "@/lib/supabase/client";
import {
  Transaction,
  Budget,
  Category,
  Profile,
  TransactionWithCategory,
  BudgetWithProgress,
  DashboardStats,
  ExpenseOverviewData,
  CategoryBreakdownData,
} from "@/types";
import {
  getStoredDemoData,
  saveStoredDemoData,
  generateInitialDemoData,
} from "./storage";
import { DEFAULT_CATEGORIES } from "@/lib/constants";
import { getCurrentMonth, calculatePercentage } from "@/lib/utils";

// Detect if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes("placeholder-finora") &&
    !key.includes("placeholder-anon-key")
  );
}

// ------------------------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    const store = getStoredDemoData();
    return store.categories;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data || data.length === 0) {
    // Return fallback default categories
    return DEFAULT_CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      icon: c.icon,
      color: c.color,
      created_at: new Date().toISOString(),
    }));
  }

  return data as Category[];
}

// ------------------------------------------------------------------------------
// TRANSACTIONS CRUD
// ------------------------------------------------------------------------------
export async function getTransactions(userId?: string): Promise<TransactionWithCategory[]> {
  const categories = await getCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    return store.transactions
      .map((t) => ({
        ...t,
        category: t.category_id ? categoryMap.get(t.category_id) || null : null,
      }))
      .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      category:categories(*)
    `)
    .order("transaction_date", { ascending: false });

  if (error) {
    console.error("Supabase getTransactions error:", error);
    const store = getStoredDemoData();
    return store.transactions.map((t) => ({
      ...t,
      category: t.category_id ? categoryMap.get(t.category_id) || null : null,
    }));
  }

  return (data || []) as unknown as TransactionWithCategory[];
}

export async function createTransaction(
  payload: Omit<Transaction, "id" | "created_at" | "updated_at">,
  userId?: string
): Promise<Transaction> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    const newTx: Transaction = {
      ...payload,
      id: "tx-" + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.transactions.unshift(newTx);
    saveStoredDemoData(store);
    return newTx;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        ...payload,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Transaction;
}

export async function updateTransaction(
  id: string,
  payload: Partial<Omit<Transaction, "id" | "user_id" | "created_at" | "updated_at">>,
  userId?: string
): Promise<Transaction> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    const index = store.transactions.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Transaction not found");

    const updated: Transaction = {
      ...store.transactions[index],
      ...payload,
      updated_at: new Date().toISOString(),
    };
    store.transactions[index] = updated;
    saveStoredDemoData(store);
    return updated;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("transactions")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Transaction;
}

export async function deleteTransaction(id: string, userId?: string): Promise<void> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    store.transactions = store.transactions.filter((t) => t.id !== id);
    saveStoredDemoData(store);
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ------------------------------------------------------------------------------
// BUDGETS CRUD & SPENT CALCULATIONS
// ------------------------------------------------------------------------------
export async function getBudgetsWithProgress(
  month: string = getCurrentMonth(),
  userId?: string
): Promise<BudgetWithProgress[]> {
  const categories = await getCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  let rawBudgets: Budget[] = [];
  let transactions: TransactionWithCategory[] = [];

  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    rawBudgets = store.budgets.filter((b) => b.month === month);
    transactions = await getTransactions();
  } else {
    const supabase = createClient();
    const { data: budgetData, error: budgetError } = await supabase
      .from("budgets")
      .select("*")
      .eq("month", month);

    if (budgetError) throw new Error(budgetError.message);
    rawBudgets = (budgetData || []) as Budget[];
    transactions = await getTransactions(userId);
  }

  // Calculate actual spending for each category in this specific month
  const categorySpentMap = new Map<string, number>();

  transactions.forEach((tx) => {
    if (tx.type === "expense" && tx.category_id && tx.transaction_date.startsWith(month)) {
      const current = categorySpentMap.get(tx.category_id) || 0;
      categorySpentMap.set(tx.category_id, current + Number(tx.amount));
    }
  });

  return rawBudgets.map((b) => {
    const category = categoryMap.get(b.category_id) || {
      id: b.category_id,
      name: "Uncategorized",
      type: "expense" as const,
      icon: "MoreHorizontal",
      color: "#64748B",
      created_at: new Date().toISOString(),
    };

    const spent = categorySpentMap.get(b.category_id) || 0;
    const remaining = Number(b.amount) - spent;
    const percentage = calculatePercentage(spent, Number(b.amount));

    let status: "normal" | "warning" | "exceeded" = "normal";
    if (percentage >= 100) {
      status = "exceeded";
    } else if (percentage >= 80) {
      status = "warning";
    }

    return {
      ...b,
      category,
      spent,
      remaining,
      percentage,
      status,
    };
  });
}

export async function createBudget(
  payload: Omit<Budget, "id" | "created_at" | "updated_at">,
  userId?: string
): Promise<Budget> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    const existing = store.budgets.find(
      (b) => b.category_id === payload.category_id && b.month === payload.month
    );
    if (existing) {
      throw new Error("A budget for this category already exists in this month");
    }

    const newBudget: Budget = {
      ...payload,
      id: "bg-" + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.budgets.push(newBudget);
    saveStoredDemoData(store);
    return newBudget;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        ...payload,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("A budget for this category already exists in this month");
    }
    throw new Error(error.message);
  }
  return data as Budget;
}

export async function updateBudget(
  id: string,
  payload: Partial<Omit<Budget, "id" | "user_id" | "created_at" | "updated_at">>,
  userId?: string
): Promise<Budget> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    const index = store.budgets.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Budget not found");

    const updated: Budget = {
      ...store.budgets[index],
      ...payload,
      updated_at: new Date().toISOString(),
    };
    store.budgets[index] = updated;
    saveStoredDemoData(store);
    return updated;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("budgets")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Budget;
}

export async function deleteBudget(id: string, userId?: string): Promise<void> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    store.budgets = store.budgets.filter((b) => b.id !== id);
    saveStoredDemoData(store);
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from("budgets").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ------------------------------------------------------------------------------
// DASHBOARD & ANALYTICS DERIVED CALCULATIONS
// ------------------------------------------------------------------------------
export async function getDashboardData(userId?: string): Promise<{
  stats: DashboardStats;
  recentTransactions: TransactionWithCategory[];
  budgetProgress: BudgetWithProgress[];
  monthlyExpenseTrend: ExpenseOverviewData[];
  expenseByCategory: CategoryBreakdownData[];
}> {
  const transactions = await getTransactions(userId);
  const currentMonth = getCurrentMonth();
  const budgetProgress = await getBudgetsWithProgress(currentMonth, userId);

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    const amt = Number(tx.amount);
    if (tx.type === "income") {
      totalIncome += amt;
    } else {
      totalExpense += amt;
    }
  });

  const totalBalance = totalIncome - totalExpense;
  const savings = totalIncome > totalExpense ? totalIncome - totalExpense : 0;
  const savingsRate = totalIncome > 0 ? Number(((savings / totalIncome) * 100).toFixed(1)) : 0;

  const stats: DashboardStats = {
    totalBalance,
    totalIncome,
    totalExpense,
    savings,
    savingsRate,
    incomeGrowth: 12.5,
    expenseGrowth: -4.2,
  };

  const recentTransactions = transactions.slice(0, 5);

  // Monthly trends (Last 6 months)
  const monthlyExpenseTrend: ExpenseOverviewData[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const periodLabel = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;

    let mIncome = 0;
    let mExpense = 0;

    transactions.forEach((tx) => {
      if (tx.transaction_date.startsWith(mStr)) {
        if (tx.type === "income") {
          mIncome += Number(tx.amount);
        } else {
          mExpense += Number(tx.amount);
        }
      }
    });

    monthlyExpenseTrend.push({
      period: periodLabel,
      income: mIncome,
      expense: mExpense,
      savings: Math.max(0, mIncome - mExpense),
    });
  }

  // Expense by Category (Current month or all-time if month empty)
  const categoryExpenses = new Map<string, { category: Category; amount: number; count: number }>();
  let totalCatExpense = 0;

  transactions.forEach((tx) => {
    if (tx.type === "expense" && tx.category) {
      const catId = tx.category.id;
      const amt = Number(tx.amount);
      totalCatExpense += amt;

      const curr = categoryExpenses.get(catId);
      if (curr) {
        curr.amount += amt;
        curr.count += 1;
      } else {
        categoryExpenses.set(catId, {
          category: tx.category,
          amount: amt,
          count: 1,
        });
      }
    }
  });

  const expenseByCategory: CategoryBreakdownData[] = Array.from(categoryExpenses.values())
    .map(({ category, amount, count }) => ({
      categoryId: category.id,
      categoryName: category.name,
      color: category.color || "#6366F1",
      icon: category.icon,
      amount,
      percentage: totalCatExpense > 0 ? Number(((amount / totalCatExpense) * 100).toFixed(1)) : 0,
      transactionCount: count,
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    stats,
    recentTransactions,
    budgetProgress: budgetProgress.slice(0, 4),
    monthlyExpenseTrend,
    expenseByCategory,
  };
}

// ------------------------------------------------------------------------------
// PROFILE SERVICE
// ------------------------------------------------------------------------------
export async function getProfile(userId?: string): Promise<Profile | null> {
  if (!isSupabaseConfigured() || !userId) {
    const store = getStoredDemoData();
    return store.profile;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Supabase getProfile error:", error);
    return null;
  }
  return data as Profile;
}

export async function updateProfile(
  userId: string,
  payload: Partial<Profile>
): Promise<Profile> {
  if (!isSupabaseConfigured()) {
    const store = getStoredDemoData();
    store.profile = { ...store.profile, ...payload, updated_at: new Date().toISOString() };
    saveStoredDemoData(store);
    return store.profile;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Profile;
}

// ------------------------------------------------------------------------------
// SEED LIVE DATABASE HELPER
// ------------------------------------------------------------------------------
export async function seedLiveDatabase(userId: string): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured()) {
    const initial = generateInitialDemoData(userId);
    saveStoredDemoData(initial);
    return { success: true, message: "Demo data reset successfully in local store." };
  }

  const supabase = createClient();
  const demoData = generateInitialDemoData(userId);

  try {
    // 1. Ensure categories exist
    for (const cat of demoData.categories) {
      await supabase.from("categories").upsert({
        name: cat.name,
        type: cat.type,
        icon: cat.icon,
        color: cat.color,
      });
    }

    // Retrieve fresh category map
    const { data: dbCategories } = await supabase.from("categories").select("*");
    const catByName = new Map((dbCategories || []).map((c) => [c.name, c.id]));

    // 2. Insert sample transactions
    const txToInsert = demoData.transactions.map((tx) => {
      const demoCat = demoData.categories.find((c) => c.id === tx.category_id);
      const realCatId = demoCat ? catByName.get(demoCat.name) : null;
      return {
        user_id: userId,
        category_id: realCatId,
        title: tx.title,
        description: tx.description,
        amount: tx.amount,
        type: tx.type,
        transaction_date: tx.transaction_date,
      };
    });

    await supabase.from("transactions").insert(txToInsert);

    // 3. Insert sample budgets
    const budgetsToInsert = demoData.budgets
      .map((b) => {
        const demoCat = demoData.categories.find((c) => c.id === b.category_id);
        const realCatId = demoCat ? catByName.get(demoCat.name) : null;
        if (!realCatId) return null;
        return {
          user_id: userId,
          category_id: realCatId,
          amount: b.amount,
          month: b.month,
        };
      })
      .filter((item): item is { user_id: string; category_id: string; amount: number; month: string } => item !== null);

    if (budgetsToInsert.length > 0) {
      await supabase.from("budgets").upsert(budgetsToInsert);
    }

    return { success: true, message: "Successfully populated your live database with sample financial data!" };
  } catch (err: unknown) {
    const error = err as Error;
    return { success: false, message: error.message || "Failed to seed database" };
  }
}
