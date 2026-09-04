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
        className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="User navigation menu"
        aria-expanded={isOpen}
      >
        <Avatar
          src={profile?.avatar_url}
          fallbackText={displayName}
          size="sm"
          className="ring-2 ring-primary/20"
        />
        <div className="hidden text-left md:block">
          <p className="text-xs font-semibold text-foreground line-clamp-1">{displayName}</p>
          <p className="text-[10px] text-muted-foreground line-clamp-1">
            {isDemoUser ? "Demo Account" : displayEmail}
          </p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-xl animate-in fade-in-50 zoom-in-95 z-50">
          <div className="px-3 py-2 border-b border-border/50">
            <p className="text-xs font-semibold text-foreground">{displayName}</p>
            <p className="text-[11px] text-muted-foreground truncate">{displayEmail}</p>
            {isDemoUser && (
              <span className="mt-1 inline-flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                <Sparkles className="h-3 w-3" /> Live Demo Mode
              </span>
            )}
          </div>

          <div className="py-1">
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              Profile & Preferences
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </Link>
          </div>

          <div className="border-t border-border/50 pt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
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
