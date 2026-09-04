import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to Indonesian Rupiah currency format.
 * Example: 12500000 -> "Rp12.500.000"
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Rp0";
  }

  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);

  // Clean format to match design "Rp12.500.000" without space or with standard non-breaking space
  return formatted.replace(/\s+/g, "");
}

/**
 * Formats date into standard user-facing format: "03 Sep 2026"
 */
export function formatDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "-";
  try {
    const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
    if (isNaN(date.getTime())) return "-";
    return format(date, "dd MMM yyyy");
  } catch {
    return "-";
  }
}

/**
 * Formats month string "2026-09" into "September 2026"
 */
export function formatMonthYear(monthStr: string): string {
  if (!monthStr) return "";
  try {
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return format(date, "MMMM yyyy");
  } catch {
    return monthStr;
  }
}

/**
 * Returns current month string in YYYY-MM format
 */
export function getCurrentMonth(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

/**
 * Returns contextual greeting based on local time
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

/**
 * Calculates percentage safely with bounds
 */
export function calculatePercentage(spent: number, budget: number): number {
  if (!budget || budget <= 0) return 0;
  const ratio = (spent / budget) * 100;
  return Number(ratio.toFixed(1));
}

/**
 * Calculates savings rate safely
 */
export function calculateSavingsRate(income: number, expense: number): number {
  if (!income || income <= 0) return 0;
  const savings = income - expense;
  if (savings <= 0) return 0;
  return Number(((savings / income) * 100).toFixed(1));
}
