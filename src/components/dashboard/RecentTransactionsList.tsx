import React from "react";
import Link from "next/link";
import { TransactionWithCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, ReceiptText } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

interface RecentTransactionsListProps {
  transactions: TransactionWithCategory[];
  isLoading?: boolean;
  onAddTransaction?: () => void;
}

export function RecentTransactionsList({
  transactions,
  isLoading = false,
  onAddTransaction,
}: RecentTransactionsListProps) {
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#F59E0B]">
            LATEST ACTIVITY
          </span>
          <h3 className="text-lg font-black tracking-tight text-[#1E293B] dark:text-white">
            Recent Transactions
          </h3>
          <p className="text-xs text-[#64748B] dark:text-slate-400 font-medium">
            Recent income and expense logs
          </p>
        </div>

        <Link
          href="/transactions"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-xs font-bold text-[#475569] hover:text-[#2563EB] dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white transition-colors"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="pt-1">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-3 w-20 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <EmptyState
            icon={ReceiptText}
            title="No transactions yet"
            description="Start recording your daily expenses and income to track them here."
            actionLabel="Add Transaction"
            onAction={onAddTransaction}
            className="border-0 my-0 py-6"
          />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((tx) => {
              const isIncome = tx.type === "income";

              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 px-3 rounded-2xl -mx-2"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <CategoryIcon
                      iconName={tx.category?.icon}
                      color={tx.category?.color}
                      size="md"
                    />
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-bold text-[#1E293B] dark:text-white truncate">
                        {tx.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-[#64748B] dark:text-slate-400 font-medium">
                        <span>{tx.category?.name || "Uncategorized"}</span>
                        <span>•</span>
                        <span>{formatDate(tx.transaction_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`text-xs md:text-sm font-black ${
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-[#1E293B] dark:text-white"
                      }`}
                    >
                      {isIncome ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
