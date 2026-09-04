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
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/60 backdrop-blur-md shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center border-b border-border/60">
        <BrandLogo showTagline size="sm" />
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Menu
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
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs shadow-primary/20 font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Demo Mode / Supabase Status Banner */}
      <div className="p-3">
        <div className="rounded-xl border border-border/60 bg-muted/40 p-3 space-y-1.5">
          <div className="flex items-center gap-2">
            {isDemoUser ? (
              <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
            ) : (
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            )}
            <p className="text-xs font-semibold text-foreground">
              {isDemoUser ? "Demo Sandbox" : "Supabase Connected"}
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {isDemoUser
              ? "All actions persist locally. Connect Supabase anytime."
              : "Protected by PostgreSQL RLS & auth policies."}
          </p>
        </div>
      </div>

      {/* Bottom Profile & Sign Out Action */}
      <div className="p-3 border-t border-border/60">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
