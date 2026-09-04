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

export const DEFAULT_CATEGORIES = [
  // Expense
  { id: "cat-exp-1", name: "Food", type: "expense" as const, icon: "Utensils", color: "#EF4444" },
  { id: "cat-exp-2", name: "Transportation", type: "expense" as const, icon: "Car", color: "#F97316" },
  { id: "cat-exp-3", name: "Shopping", type: "expense" as const, icon: "ShoppingBag", color: "#EC4899" },
  { id: "cat-exp-4", name: "Bills", type: "expense" as const, icon: "Receipt", color: "#8B5CF6" },
  { id: "cat-exp-5", name: "Entertainment", type: "expense" as const, icon: "Gamepad2", color: "#3B82F6" },
  { id: "cat-exp-6", name: "Health", type: "expense" as const, icon: "HeartPulse", color: "#10B981" },
  { id: "cat-exp-7", name: "Education", type: "expense" as const, icon: "GraduationCap", color: "#6366F1" },
  { id: "cat-exp-8", name: "Other Expense", type: "expense" as const, icon: "MoreHorizontal", color: "#64748B" },
  // Income
  { id: "cat-inc-1", name: "Salary", type: "income" as const, icon: "Briefcase", color: "#10B981" },
  { id: "cat-inc-2", name: "Freelance", type: "income" as const, icon: "Laptop", color: "#06B6D4" },
  { id: "cat-inc-3", name: "Business", type: "income" as const, icon: "Store", color: "#8B5CF6" },
  { id: "cat-inc-4", name: "Investment", type: "income" as const, icon: "TrendingUp", color: "#F59E0B" },
  { id: "cat-inc-5", name: "Other Income", type: "income" as const, icon: "Wallet", color: "#64748B" },
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
