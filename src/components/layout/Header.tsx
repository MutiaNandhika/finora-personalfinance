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
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 md:px-8 backdrop-blur-md">
        {/* Left Section: Mobile Nav Trigger & Page Title */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <div>
            <h1 className="text-base md:text-lg font-bold text-foreground leading-none">
              {pageTitle}
            </h1>
            <p className="text-[11px] text-muted-foreground hidden sm:block mt-0.5">
              {currentNav?.description || "Take control of your money."}
            </p>
          </div>
        </div>

        {/* Right Section: Quick Add, Notification, Theme, User Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button
            size="sm"
            onClick={() => setIsAddTxOpen(true)}
            className="hidden sm:inline-flex gap-1.5 font-medium shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>New Transaction</span>
          </Button>

          {/* Quick Icon Button for Mobile */}
          <Button
            size="icon-sm"
            onClick={() => setIsAddTxOpen(true)}
            className="sm:hidden h-8 w-8"
            aria-label="Add transaction"
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Notification Button */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
            </Button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-xl animate-in fade-in zoom-in-95 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-border/50 mb-2">
                  <span className="text-xs font-semibold text-foreground">Notifications</span>
                  <span className="text-[10px] text-muted-foreground">1 unread</span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-muted/50 p-2 text-xs">
                    <p className="font-medium text-foreground">Budget Alert</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Food category budget is at 72.5% of limit.
                    </p>
                    <span className="text-[10px] text-primary mt-1 block">Just now</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <div className="h-4 w-[1px] bg-border mx-1 hidden sm:block" />

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
