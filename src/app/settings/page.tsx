"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/common/PageHeader";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { User, Palette, Bell, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTab = "profile" | "appearance" | "notifications" | "account";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "appearance" as const, label: "Appearance", icon: Palette },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "account" as const, label: "Account & Database", icon: Shield },
  ];

  return (
    <AppLayout>
      <PageHeader
        title="Application Settings"
        description="Manage your account profile, theme preferences, notifications, and Supabase database."
      />

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Settings Navigation Tabs Sidebar */}
        <aside className="w-full md:w-60 shrink-0 space-y-1 rounded-xl border border-border bg-card/60 p-2 backdrop-blur-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-colors text-left",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Main Settings Content Area */}
        <main className="flex-1 w-full min-w-0">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "account" && <AccountSettings />}
        </main>
      </div>
    </AppLayout>
  );
}
