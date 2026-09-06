"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";
import { UserNav } from "./UserNav";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { TransactionModal } from "@/components/transactions/TransactionModal";

export function Header() {
  const pathname = usePathname();
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentNav = NAV_ITEMS.find(
    (item) =>
      item.href === pathname ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href))
  );

  const pageTitle = currentNav?.title || "Finora";

  return (
    <>
      <header className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 px-4 md:px-8 backdrop-blur-md">
        {/* Left Section: Mobile Nav Trigger & Page Title */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <div>
            <h1 className="text-lg md:text-xl font-black text-[#1E293B] dark:text-white leading-tight tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-xs text-[#64748B] dark:text-slate-400 hidden sm:block font-medium">
              {currentNav?.description || "Take control of your money."}
            </p>
          </div>
        </div>

        {/* Right Section: Quick Add, Notification, Theme, User Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddTxOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </button>

          {/* Quick Icon Button for Mobile */}
          <button
            onClick={() => setIsAddTxOpen(true)}
            className="sm:hidden h-9 w-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-600/25"
            aria-label="Add transaction"
          >
            <Plus className="h-4 w-4" />
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative h-10 w-10 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-[#64748B] hover:text-[#1E293B] dark:hover:text-white flex items-center justify-center shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#2563EB]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xl animate-in fade-in zoom-in-95 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <span className="text-xs font-extrabold text-[#1E293B] dark:text-white">Notifications</span>
                  <span className="text-[10px] font-bold text-[#F59E0B]">1 unread</span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-xl bg-[#FEF9C3]/70 dark:bg-amber-950/40 p-3 text-xs border border-[#FDE047]/50 dark:border-amber-900/50">
                    <p className="font-bold text-[#1E293B] dark:text-white">Budget Alert</p>
                    <p className="text-[11px] text-[#64748B] dark:text-slate-300 mt-0.5 font-medium">
                      Food category budget is at 72.5% of limit.
                    </p>
                    <span className="text-[10px] font-bold text-[#2563EB] mt-1 block">Just now</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

          <UserNav />
        </div>
      </header>

      {/* Global Quick Add Transaction Modal */}
      <TransactionModal
        open={isAddTxOpen}
        onOpenChange={setIsAddTxOpen}
        mode="create"
      />
    </>
  );
}
