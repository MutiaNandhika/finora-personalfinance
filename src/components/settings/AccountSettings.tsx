"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles, ShieldCheck, Database } from "lucide-react";
import { SeedDemoDataModal } from "./SeedDemoDataModal";

export function AccountSettings() {
  const { user, profile, signOut, isDemoUser } = useAuth();
  const [isSeedModalOpen, setIsSeedModalOpen] = useState(false);

  return (
    <>
      <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Account & Backend Security</CardTitle>
          <CardDescription className="text-xs">
            Manage your session, active database connection, and portfolio demo data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Backend Connection Status */}
          <div className="rounded-xl border border-border/70 bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Database className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {isDemoUser ? "Local Browser Sandbox Mode" : "Supabase PostgreSQL Database"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {isDemoUser
                      ? "Running fully offline with localStorage state. Perfect for portfolio testing."
                      : "Connected to Supabase live instance with Row Level Security (RLS)."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold">
                {isDemoUser ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-amber-600 dark:text-amber-400">
                    <Sparkles className="h-3.5 w-3.5" /> Sandbox
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" /> Connected
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-muted-foreground">
                Need fresh financial test data for demos or interviews?
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSeedModalOpen(true)}
                className="gap-1.5 text-xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Seed Sample Data</span>
              </Button>
            </div>
          </div>

          {/* User ID & Session Info */}
          <div className="rounded-xl border border-border/70 p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-foreground">{user?.id || "demo-user-id"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/40">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground">{user?.email || "alex.pratama@finora.io"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Member Since</span>
              <span className="text-foreground">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "Today"}
              </span>
            </div>
          </div>

          {/* Logout Section */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-foreground">Sign Out of Finora</h4>
              <p className="text-xs text-muted-foreground">
                End your active session securely on this device.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => signOut()}
              className="gap-1.5 font-semibold"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <SeedDemoDataModal
        open={isSeedModalOpen}
        onOpenChange={setIsSeedModalOpen}
      />
    </>
  );
}
