"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { BrandLogo } from "./BrandLogo";
import { useAuth } from "@/components/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { LogOut, Sparkles, ShieldCheck } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { isDemoUser, signOut } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center border-b border-slate-100 dark:border-slate-800">
        <BrandLogo showTagline size="sm" />
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2">
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
              className={cn(
                "group flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-bold transition-all",
                isActive
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                  : "text-[#475569] dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-900 hover:text-[#2563EB] dark:hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                  isActive
                    ? "text-white"
                    : "text-[#64748B] dark:text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-white"
                )}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Demo Mode / Supabase Status Banner */}
      <div className="p-4">
        <div
          className={cn(
            "rounded-2xl border p-3.5 space-y-1.5 transition-all",
            isDemoUser
              ? "bg-[#FEF9C3]/80 dark:bg-amber-950/30 border-[#FDE047] dark:border-amber-900/50 text-[#1E293B] dark:text-amber-200"
              : "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-[#1E293B] dark:text-emerald-200"
          )}
        >
          <div className="flex items-center gap-2">
            {isDemoUser ? (
              <Sparkles className="h-4 w-4 text-[#D97706] shrink-0" />
            ) : (
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            )}
            <p className="text-xs font-black text-[#1E293B] dark:text-white">
              {isDemoUser ? "Demo Sandbox" : "Supabase Connected"}
            </p>
          </div>
          <p className="text-[11px] text-[#64748B] dark:text-slate-300 leading-relaxed font-medium">
            {isDemoUser
              ? "All actions persist locally. Connect Supabase anytime."
              : "Protected by PostgreSQL RLS & auth policies."}
          </p>
        </div>
      </div>

      {/* Bottom Profile & Sign Out Action */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#64748B] hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
