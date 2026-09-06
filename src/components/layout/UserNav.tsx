"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { Avatar } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, Settings, Sparkles } from "lucide-react";

export function UserNav() {
  const { user, profile, signOut, isDemoUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Alex Pratama";
  const displayEmail = profile?.email || user?.email || "alex.pratama@finora.io";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full p-1 transition-all hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
        aria-label="User navigation menu"
        aria-expanded={isOpen}
      >
        <Avatar
          src={profile?.avatar_url}
          fallbackText={displayName}
          size="sm"
          className="ring-2 ring-[#2563EB]/20"
        />
        <div className="hidden text-left md:block pr-1">
          <p className="text-xs font-black text-[#1E293B] dark:text-white line-clamp-1">{displayName}</p>
          <p className="text-[10px] text-[#64748B] dark:text-slate-400 line-clamp-1 font-medium">
            {isDemoUser ? "Demo Account" : displayEmail}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl animate-in fade-in-50 zoom-in-95 z-50">
          <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-black text-[#1E293B] dark:text-white">{displayName}</p>
            <p className="text-[11px] text-[#64748B] dark:text-slate-400 truncate font-medium">{displayEmail}</p>
            {isDemoUser && (
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#FEF9C3] dark:bg-amber-950/50 px-2 py-0.5 text-[10px] font-extrabold text-[#D97706] border border-[#FDE047]/60">
                <Sparkles className="h-3 w-3" /> Live Demo Mode
              </span>
            )}
          </div>

          <div className="py-1.5 space-y-0.5">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <UserIcon className="h-4 w-4 text-[#64748B]" />
              Profile & Preferences
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-[#1E293B] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Settings className="h-4 w-4 text-[#64748B]" />
              Settings
            </Link>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
