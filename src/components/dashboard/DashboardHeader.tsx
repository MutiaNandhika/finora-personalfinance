"use client";

import React from "react";
import { getGreeting } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-border/40">
      <div>
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        ) : (
          <>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
              {greeting}, {userName} 👋
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
              Here&apos;s your financial overview and real-time cashflow insights.
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {onSeedData && isDemoUser && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSeedData}
            className="text-xs gap-1.5 border-dashed"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Reset Demo Data</span>
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onAddBudget}
          className="text-xs gap-1.5"
        >
          <Target className="h-3.5 w-3.5" />
          <span>New Budget</span>
        </Button>

        <Button
          size="sm"
          onClick={onAddTransaction}
          className="text-xs gap-1.5 font-medium shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Transaction</span>
        </Button>
      </div>
    </div>
  );
}
