"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/components/providers/AuthProvider";
import { Menu, X, LogOut } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();

  return (
    <>
      {/* Mobile Drawer Trigger Bar (Visible only on mobile header) */}
      <div className="lg:hidden flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-xl text-[#64748B] hover:text-[#1E293B] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <BrandLogo showTagline size="sm" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#1E293B] dark:hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="px-3 pb-1">
                  <p className="text-[11px] font-extrabold tracking-wider text-[#F59E0B] uppercase">
                    MENU
                  </p>
                </div>

                {NAV_ITEMS.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-colors",
                        isActive
                          ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                          : "text-[#475569] dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-[#2563EB] dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-[#64748B]">Theme</span>
                <ThemeToggle />
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Bar on Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-bold transition-colors",
                isActive
                  ? "text-[#2563EB] font-black"
                  : "text-[#64748B] dark:text-slate-400 hover:text-[#1E293B] dark:hover:text-white"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-0.5", isActive ? "stroke-[2.5]" : "stroke-2")} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
