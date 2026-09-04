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
import { DEFAULT_CATEGORIES, DEMO_USER_KEY } from "@/lib/constants";
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

// Check if active session is in local sandbox/demo mode
export function isDemoMode(userId?: string): boolean {
  if (!isSupabaseConfigured() || !userId || userId === "demo-user-id") {
    return true;
  }
  if (typeof window !== "undefined") {
    return localStorage.getItem(DEMO_USER_KEY) === "true";
  }
  return false;
}

// Helper to map legacy category IDs or resolve to a valid UUID
export function mapToValidCategoryId(
  rawCategoryId?: string | null,
  categories: Category[] = []
): string | null {
  if (!rawCategoryId) return null;

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawCategoryId);
  if (isUuid) {
    const exists = categories.some((c) => c.id === rawCategoryId);
    if (exists || categories.length === 0) return rawCategoryId;
  }

  // Legacy ID mapping (e.g. cat-inc-1 -> Salary -> matching UUID)
  const legacyToName: Record<string, string> = {
    "cat-inc-1": "Salary",
    "cat-inc-2": "Freelance",
    "cat-inc-3": "Business",
    "cat-inc-4": "Investment",
    "cat-inc-5": "Other Income",
    "cat-exp-1": "Food",
    "cat-exp-2": "Transportation",
    "cat-exp-3": "Shopping",
    "cat-exp-4": "Bills",
    "cat-exp-5": "Entertainment",
    "cat-exp-6": "Health",
    "cat-exp-7": "Education",
    "cat-exp-8": "Other Expense",
  };

  const targetName = legacyToName[rawCategoryId];
  if (targetName) {
    const match = categories.find((c) => c.name.toLowerCase() === targetName.toLowerCase());
    if (match && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(match.id)) {
      return match.id;
    }
    const defMatch = DEFAULT_CATEGORIES.find((c) => c.name.toLowerCase() === targetName.toLowerCase());
    if (defMatch) return defMatch.id;
  }

  // Check if rawCategoryId matches any default category id
  const def = DEFAULT_CATEGORIES.find((c) => c.id === rawCategoryId);
  if (def) return def.id;

  if (isUuid) return rawCategoryId;
  return categories[0]?.id || null;
}

// ------------------------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------------------------
export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    const store = getStoredDemoData();
    return store.categories;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      if (!error && (!data || data.length === 0)) {
        try {
          const defaultRows = DEFAULT_CATEGORIES.map((c) => ({
            id: c.id,
            name: c.name,
            type: c.type,
            icon: c.icon,
            color: c.color,
          }));
          await supabase.from("categories").upsert(defaultRows, { onConflict: "id" });
        } catch {
          // ignore auto-seed background error
        }
      }

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
  } catch {
    return DEFAULT_CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      type: c.type,
      icon: c.icon,
      color: c.color,
      created_at: new Date().toISOString(),
    }));
  }
}

// ------------------------------------------------------------------------------
// TRANSACTIONS CRUD
// ------------------------------------------------------------------------------
export async function getTransactions(userId?: string): Promise<TransactionWithCategory[]> {
  const categories = await getCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  if (isDemoMode(userId)) {
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
    console.warn("Supabase getTransactions notice:", error.message);
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
  if (isDemoMode(userId)) {
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

  const categories = await getCategories();
  const validCategoryId = mapToValidCategoryId(payload.category_id, categories);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        ...payload,
        category_id: validCategoryId,
        user_id: userId!,
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
  if (isDemoMode(userId)) {
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

  let validCategoryId = payload.category_id;
  if (payload.category_id !== undefined) {
    const categories = await getCategories();
    validCategoryId = mapToValidCategoryId(payload.category_id, categories) || undefined;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("transactions")
    .update({
      ...payload,
      ...(validCategoryId !== undefined ? { category_id: validCategoryId } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Transaction;
}

export async function deleteTransaction(id: string, userId?: string): Promise<void> {
  if (isDemoMode(userId)) {
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

  if (isDemoMode(userId)) {
    const store = getStoredDemoData();
    rawBudgets = store.budgets.filter((b) => b.month === month);
    transactions = await getTransactions(userId);
  } else {
    const supabase = createClient();
    const { data: budgetData, error: budgetError } = await supabase
      .from("budgets")
      .select("*")
      .eq("month", month);

    if (budgetError) {
      console.warn("Supabase getBudgets notice:", budgetError.message);
      const store = getStoredDemoData();
      rawBudgets = store.budgets.filter((b) => b.month === month);
    } else {
      rawBudgets = (budgetData || []) as Budget[];
    }
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
  if (isDemoMode(userId)) {
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

  const categories = await getCategories();
  const validCategoryId = mapToValidCategoryId(payload.category_id, categories);

  if (!validCategoryId) {
    throw new Error("Invalid expense category selected.");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("budgets")
    .insert([
      {
        ...payload,
        category_id: validCategoryId,
        user_id: userId!,
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
  if (isDemoMode(userId)) {
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

  let validCategoryId = payload.category_id;
  if (payload.category_id !== undefined) {
    const categories = await getCategories();
    validCategoryId = mapToValidCategoryId(payload.category_id, categories) || undefined;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("budgets")
    .update({
      ...payload,
      ...(validCategoryId !== undefined ? { category_id: validCategoryId } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Budget;
}

export async function deleteBudget(id: string, userId?: string): Promise<void> {
  if (isDemoMode(userId)) {
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
  if (isDemoMode(userId)) {
    const store = getStoredDemoData();
    return store.profile;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId!)
      .single();

    if (error) {
      console.warn("Supabase getProfile notice:", error.message);
      return null;
    }
    return data as Profile;
  } catch {
    return null;
  }
}

export async function updateProfile(
  userId: string,
  payload: Partial<Profile>
): Promise<Profile> {
  if (isDemoMode(userId)) {
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
  if (isDemoMode(userId)) {
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
