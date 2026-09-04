"use client";

import React from "react";
import { TransactionFiltersState, Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface TransactionFiltersProps {
  filters: TransactionFiltersState;
  onFilterChange: (newFilters: Partial<TransactionFiltersState>) => void;
  categories: Category[];
  onReset: () => void;
}

export function TransactionFilters({
  filters,
  onFilterChange,
  categories,
  onReset,
}: TransactionFiltersProps) {
  const filteredCategories =
    filters.type === "all"
      ? categories
      : categories.filter((c) => c.type === filters.type);

  const hasActiveFilters =
    Boolean(filters.search) ||
    filters.type !== "all" ||
    filters.categoryId !== "all" ||
    Boolean(filters.startDate) ||
    Boolean(filters.endDate) ||
    filters.sortBy !== "newest";

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card/60 p-4 backdrop-blur-xs">
      {/* Top Bar: Search + Type Toggles + Reset */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, description, or category..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="flex h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3.5 py-2 text-sm text-foreground shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: "" })}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Type Toggle Pills */}
        <div className="inline-flex rounded-lg bg-muted p-1 text-xs shrink-0">
          <button
            onClick={() => onFilterChange({ type: "all", categoryId: "all" })}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filters.type === "all"
                ? "bg-card text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange({ type: "income", categoryId: "all" })}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filters.type === "income"
                ? "bg-card text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => onFilterChange({ type: "expense", categoryId: "all" })}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filters.type === "expense"
                ? "bg-card text-rose-600 dark:text-rose-400 shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Bottom Row: Category, Date Range, Sort Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
        {/* Category Dropdown */}
        <div>
          <Select
            value={filters.categoryId}
            onChange={(e) => onFilterChange({ categoryId: e.target.value })}
            className="h-9 text-xs"
          >
            <option value="all">All Categories</option>
            {filteredCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.type})
              </option>
            ))}
          </Select>
        </div>

        {/* Start Date */}
        <div>
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
            className="h-9 text-xs"
            placeholder="From date"
          />
        </div>

        {/* End Date */}
        <div>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange({ endDate: e.target.value })}
            className="h-9 text-xs"
            placeholder="To date"
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2">
          <Select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as TransactionFiltersState["sortBy"],
              })
            }
            className="h-9 text-xs flex-1"
          >
            <option value="newest">Sort: Newest first</option>
            <option value="oldest">Sort: Oldest first</option>
            <option value="highest">Sort: Highest amount</option>
            <option value="lowest">Sort: Lowest amount</option>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-9 px-2 text-xs text-muted-foreground hover:text-destructive shrink-0"
              title="Reset all filters"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
