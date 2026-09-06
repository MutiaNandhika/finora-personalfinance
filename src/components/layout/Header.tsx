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
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 px-4 md:px-6 backdrop-blur-md">
        {/* Left Section: Mobile Nav Trigger & Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <MobileNav />
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black text-[#1E293B] dark:text-white leading-tight tracking-tight truncate">
              {pageTitle}
            </h1>
            <p className="text-[11px] text-[#64748B] dark:text-slate-400 hidden sm:block font-medium truncate">
              {currentNav?.description || "Take control of your money."}
            </p>
          </div>
        </div>

        {/* Right Section: Quick Add, Notification, Theme, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setIsAddTxOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Transaction</span>
          </button>

          {/* Quick Icon Button for Mobile / Tablet */}
          <button
            onClick={() => setIsAddTxOpen(true)}
            className="md:hidden h-8 w-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-sm"
            aria-label="Add transaction"
          >
            <Plus className="h-4 w-4" />
          </button>

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative h-9 w-9 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-[#64748B] hover:text-[#1E293B] dark:hover:text-white flex items-center justify-center shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#2563EB]" />
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

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-0.5 hidden sm:block" />

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
