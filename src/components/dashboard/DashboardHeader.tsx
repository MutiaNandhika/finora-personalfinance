"use client";

import React from "react";
import { getGreeting } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { Plus, Target, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardHeaderProps {
  onAddTransaction: () => void;
  onAddBudget: () => void;
  onSeedData?: () => void;
}

export function DashboardHeader({
  onAddTransaction,
  onAddBudget,
  onSeedData,
}: DashboardHeaderProps) {
  const { user, profile, isLoading, isDemoUser } = useAuth();
  const greeting = getGreeting();
  const userName = profile?.full_name || user?.user_metadata?.full_name || "Alex";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 md:p-7 shadow-xs">
      {/* Decorative Pastel Background Accents */}
      <div className="absolute -top-8 -right-8 w-36 h-36 bg-[#FEF08A]/50 dark:bg-amber-950/20 rounded-full blur-2xl -z-0 pointer-events-none" />
      <div className="absolute -bottom-8 right-32 w-28 h-28 bg-[#BAE6FD]/40 dark:bg-blue-950/20 rounded-full blur-xl -z-0 pointer-events-none" />
      
      {/* Subtle Blue Squiggle Doodle on Right */}
      <div className="hidden lg:block absolute top-6 right-8 text-[#2563EB]/20 dark:text-blue-500/10 pointer-events-none select-none">
        <svg width="48" height="28" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M2 12C6 6 10 18 14 12C18 6 22 18 26 12C30 6 34 18 38 12" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1.5 max-w-2xl min-w-0">
          {/* Orange Kicker */}
          <div className="inline-flex items-center gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
              100% SMART & SIMPLE FINANCE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span className="text-[11px] font-bold text-[#64748B] dark:text-slate-400">
              Overview
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-2 pt-1">
              <Skeleton className="h-7 w-56 rounded-xl" />
              <Skeleton className="h-4 w-80 rounded-lg" />
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#1E293B] dark:text-white leading-tight">
                {greeting},{" "}
                <span className="text-[#2563EB] dark:text-blue-400 whitespace-nowrap">
                  {userName}! 👋
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-300 font-medium leading-relaxed max-w-xl">
                Track your daily balance, manage monthly category budgets, and keep cashflow balanced effortlessly.
              </p>
            </>
          )}
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          {onSeedData && isDemoUser && (
            <button
              onClick={onSeedData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-dashed border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/40 text-xs font-extrabold text-[#92400E] dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D97706]" />
              <span>Reset Sandbox</span>
            </button>
          )}

          <button
            onClick={onAddBudget}
            className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#FEF08A] hover:bg-[#FDE047] dark:bg-amber-400 dark:hover:bg-amber-300 text-[#1E293B] text-xs font-black shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Target className="h-4 w-4 text-[#1E293B]" />
            <span>New Budget</span>
          </button>

          <button
            onClick={onAddTransaction}
            className="inline-flex items-center gap-1.5 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>
    </div>
  );
}
