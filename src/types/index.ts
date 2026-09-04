import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Budget = Database["public"]["Tables"]["budgets"]["Row"];

export type TransactionType = "income" | "expense";

export interface TransactionWithCategory extends Omit<Transaction, "category_id"> {
  category_id: string | null;
  category: Category | null;
}

export interface BudgetWithProgress extends Budget {
  category: Category;
  spent: number;
  remaining: number;
  percentage: number;
  status: "normal" | "warning" | "exceeded";
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  savings: number;
  savingsRate: number;
  incomeGrowth: number;
  expenseGrowth: number;
}

export interface ExpenseOverviewData {
  period: string;
  income: number;
  expense: number;
  savings: number;
}

export interface CategoryBreakdownData {
  categoryId: string;
  categoryName: string;
  color: string;
  icon: string;
  amount: number;
  percentage: number;
  transactionCount: number;
}

export interface TransactionFiltersState {
  search: string;
  type: "all" | "income" | "expense";
  categoryId: string;
  startDate: string;
  endDate: string;
  sortBy: "newest" | "oldest" | "highest" | "lowest";
}

export type TimeRangeFilter = "this_month" | "last_month" | "last_3_months" | "this_year" | "all_time";

export interface UserAuthContextType {
  user: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string;
    };
  } | null;
  profile: Profile | null;
  isLoading: boolean;
  isDemoUser: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  enableDemoMode: () => void;
}
