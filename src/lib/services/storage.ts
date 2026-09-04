import { DEFAULT_CATEGORIES, DEMO_STORAGE_KEY } from "@/lib/constants";
import { Transaction, Budget, Category, Profile } from "@/types";

export interface DemoStore {
  profile: Profile;
  categories: Category[];
  transactions: Transaction[];
  budgets: Budget[];
}

export function generateInitialDemoData(userId: string = "demo-user-id"): DemoStore {
  const categories: Category[] = DEFAULT_CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
    icon: c.icon,
    color: c.color,
    created_at: new Date().toISOString(),
  }));

  const profile: Profile = {
    id: userId,
    full_name: "Alex Pratama",
    email: "alex.pratama@finora.io",
    avatar_url: null,
    currency: "IDR",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const now = new Date();
  const year = now.getFullYear();
  const monthNum = now.getMonth() + 1;
  const currentMonthStr = `${year}-${String(monthNum).padStart(2, "0")}`;


  // Helper for dates in current month
  const d = (day: number, monthOffset = 0) => {
    const targetMonth = monthNum - 1 + monthOffset;
    const targetDate = new Date(year, targetMonth, day);
    return targetDate.toISOString().split("T")[0];
  };

  const transactions: Transaction[] = [
    // Current Month Income
    {
      id: "tx-inc-1",
      user_id: userId,
      category_id: "cat-inc-1", // Salary
      title: "Monthly Tech Lead Salary",
      description: "PT Teknologi Nusantara monthly payout",
      amount: 28500000,
      type: "income",
      transaction_date: d(1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-inc-2",
      user_id: userId,
      category_id: "cat-inc-2", // Freelance
      title: "Fintech UI/UX Consulting",
      description: "Singapore client milestone payment",
      amount: 9500000,
      type: "income",
      transaction_date: d(8),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-inc-3",
      user_id: userId,
      category_id: "cat-inc-4", // Investment
      title: "Stock Dividend Payout",
      description: "BBCA & TLKM quarterly dividends",
      amount: 1750000,
      type: "income",
      transaction_date: d(12),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },

    // Current Month Expenses
    {
      id: "tx-exp-1",
      user_id: userId,
      category_id: "cat-exp-4", // Bills
      title: "Apartment Rental & Utilities",
      description: "Monthly rent + high speed internet & electricity",
      amount: 4800000,
      type: "expense",
      transaction_date: d(2),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-2",
      user_id: userId,
      category_id: "cat-exp-1", // Food
      title: "Supermarket Weekly Groceries",
      description: "Ranch Market fresh ingredients and protein",
      amount: 1450000,
      type: "expense",
      transaction_date: d(3),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-3",
      user_id: userId,
      category_id: "cat-exp-2", // Transportation
      title: "Car Fuel & Toll Charges",
      description: "Pertamax Turbo & Mandiri e-Money top-up",
      amount: 850000,
      type: "expense",
      transaction_date: d(5),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-4",
      user_id: userId,
      category_id: "cat-exp-3", // Shopping
      title: "Mechanical Keyboard & Desk Mat",
      description: "Workstation productivity upgrades",
      amount: 2200000,
      type: "expense",
      transaction_date: d(7),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-5",
      user_id: userId,
      category_id: "cat-exp-1", // Food
      title: "Dinner with Team",
      description: "Casual weekend dinner at Osteria Gia",
      amount: 920000,
      type: "expense",
      transaction_date: d(9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-6",
      user_id: userId,
      category_id: "cat-exp-5", // Entertainment
      title: "Cinema IMAX & Streaming Subs",
      description: "Netflix, Spotify, and Disney+ monthly bills",
      amount: 450000,
      type: "expense",
      transaction_date: d(11),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-7",
      user_id: userId,
      category_id: "cat-exp-6", // Health
      title: "Monthly Gym Membership & Supplements",
      description: "Fitness First All Club & Whey Protein",
      amount: 1100000,
      type: "expense",
      transaction_date: d(13),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-exp-8",
      user_id: userId,
      category_id: "cat-exp-7", // Education
      title: "Advanced System Design Course",
      description: "Online engineering certification subscription",
      amount: 1500000,
      type: "expense",
      transaction_date: d(14),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },

    // Previous Month Data for historical trends
    {
      id: "tx-prev-1",
      user_id: userId,
      category_id: "cat-inc-1",
      title: "Monthly Tech Lead Salary",
      description: "PT Teknologi Nusantara",
      amount: 28500000,
      type: "income",
      transaction_date: d(1, -1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-prev-2",
      user_id: userId,
      category_id: "cat-exp-4",
      title: "Apartment Rental & Utilities",
      description: "Monthly rent",
      amount: 4800000,
      type: "expense",
      transaction_date: d(2, -1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "tx-prev-3",
      user_id: userId,
      category_id: "cat-exp-1",
      title: "Monthly Food & Groceries",
      description: "Food and dining",
      amount: 3200000,
      type: "expense",
      transaction_date: d(10, -1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const budgets: Budget[] = [
    {
      id: "bg-1",
      user_id: userId,
      category_id: "cat-exp-1", // Food
      amount: 3500000,
      month: currentMonthStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "bg-2",
      user_id: userId,
      category_id: "cat-exp-4", // Bills
      amount: 5000000,
      month: currentMonthStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "bg-3",
      user_id: userId,
      category_id: "cat-exp-2", // Transportation
      amount: 1500000,
      month: currentMonthStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "bg-4",
      user_id: userId,
      category_id: "cat-exp-3", // Shopping
      amount: 2500000,
      month: currentMonthStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "bg-5",
      user_id: userId,
      category_id: "cat-exp-5", // Entertainment
      amount: 1000000,
      month: currentMonthStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "bg-6",
      user_id: userId,
      category_id: "cat-exp-6", // Health
      amount: 1200000,
      month: currentMonthStr,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return { profile, categories, transactions, budgets };
}

export function getStoredDemoData(): DemoStore {
  if (typeof window === "undefined") {
    return generateInitialDemoData();
  }

  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) {
      const initial = generateInitialDemoData();
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return generateInitialDemoData();
  }
}

export function saveStoredDemoData(data: DemoStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save demo store:", error);
  }
}
