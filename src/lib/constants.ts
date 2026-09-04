import React from "react";
import {
  LayoutDashboard,
  ReceiptText,
  PieChart,
  Target,
  Settings,
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Gamepad2,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Laptop,
  Store,
  TrendingUp,
  Wallet,
  MoreHorizontal,
  FolderMinus,
  FolderPlus,
  LucideProps,
} from "lucide-react";

export const APP_NAME = "Finora";
export const APP_TAGLINE = "Take control of your money.";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Financial overview and dynamic summaries",
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ReceiptText,
    description: "Income & expense history, search, and filters",
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: Target,
    description: "Monthly category budget tracking and alerts",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: PieChart,
    description: "Interactive visual reports and spending trends",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Account, appearance, and profile preferences",
  },
];

export const CATEGORY_ICONS_MAP: Record<
  string,
  React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
> = {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Gamepad2,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Laptop,
  Store,
  TrendingUp,
  Wallet,
  MoreHorizontal,
  FolderMinus,
  FolderPlus,
};

export const DEFAULT_CATEGORY_IDS = {
  // Expense
  FOOD: "e0000000-0000-4000-8000-000000000001",
  TRANSPORTATION: "e0000000-0000-4000-8000-000000000002",
  SHOPPING: "e0000000-0000-4000-8000-000000000003",
  BILLS: "e0000000-0000-4000-8000-000000000004",
  ENTERTAINMENT: "e0000000-0000-4000-8000-000000000005",
  HEALTH: "e0000000-0000-4000-8000-000000000006",
  EDUCATION: "e0000000-0000-4000-8000-000000000007",
  OTHER_EXPENSE: "e0000000-0000-4000-8000-000000000008",
  // Income
  SALARY: "a0000000-0000-4000-8000-000000000001",
  FREELANCE: "a0000000-0000-4000-8000-000000000002",
  BUSINESS: "a0000000-0000-4000-8000-000000000003",
  INVESTMENT: "a0000000-0000-4000-8000-000000000004",
  OTHER_INCOME: "a0000000-0000-4000-8000-000000000005",
};

export const DEFAULT_CATEGORIES = [
  // Expense
  { id: DEFAULT_CATEGORY_IDS.FOOD, name: "Food", type: "expense" as const, icon: "Utensils", color: "#EF4444" },
  { id: DEFAULT_CATEGORY_IDS.TRANSPORTATION, name: "Transportation", type: "expense" as const, icon: "Car", color: "#F97316" },
  { id: DEFAULT_CATEGORY_IDS.SHOPPING, name: "Shopping", type: "expense" as const, icon: "ShoppingBag", color: "#EC4899" },
  { id: DEFAULT_CATEGORY_IDS.BILLS, name: "Bills", type: "expense" as const, icon: "Receipt", color: "#8B5CF6" },
  { id: DEFAULT_CATEGORY_IDS.ENTERTAINMENT, name: "Entertainment", type: "expense" as const, icon: "Gamepad2", color: "#3B82F6" },
  { id: DEFAULT_CATEGORY_IDS.HEALTH, name: "Health", type: "expense" as const, icon: "HeartPulse", color: "#10B981" },
  { id: DEFAULT_CATEGORY_IDS.EDUCATION, name: "Education", type: "expense" as const, icon: "GraduationCap", color: "#6366F1" },
  { id: DEFAULT_CATEGORY_IDS.OTHER_EXPENSE, name: "Other Expense", type: "expense" as const, icon: "MoreHorizontal", color: "#64748B" },
  // Income
  { id: DEFAULT_CATEGORY_IDS.SALARY, name: "Salary", type: "income" as const, icon: "Briefcase", color: "#10B981" },
  { id: DEFAULT_CATEGORY_IDS.FREELANCE, name: "Freelance", type: "income" as const, icon: "Laptop", color: "#06B6D4" },
  { id: DEFAULT_CATEGORY_IDS.BUSINESS, name: "Business", type: "income" as const, icon: "Store", color: "#8B5CF6" },
  { id: DEFAULT_CATEGORY_IDS.INVESTMENT, name: "Investment", type: "income" as const, icon: "TrendingUp", color: "#F59E0B" },
  { id: DEFAULT_CATEGORY_IDS.OTHER_INCOME, name: "Other Income", type: "income" as const, icon: "Wallet", color: "#64748B" },
];

export const CHART_COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Rose
  "#8B5CF6", // Violet
  "#06B6D4", // Cyan
  "#EC4899", // Pink
  "#F97316", // Orange
  "#14B8A6", // Teal
  "#84CC16", // Lime
];

export const DEMO_STORAGE_KEY = "finora_demo_data_v1";
export const DEMO_USER_KEY = "finora_demo_active_user";
