"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ShieldAlert, Sparkles, Mail } from "lucide-react";
import { toast } from "sonner";

export function NotificationSettings() {
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [emailReports, setEmailReports] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const handleToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    label: string
  ) => {
    setter((prev) => {
      const next = !prev;
      toast.success(`${label} ${next ? "enabled" : "disabled"}`);
      return next;
    });
  };

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Notification Preferences</CardTitle>
        <CardDescription className="text-xs">
          Control how and when you receive financial alerts and digests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Budget Alerts */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Budget Threshold Alerts</p>
              <p className="text-xs text-muted-foreground">
                Get notified when any category spending exceeds 80% of its budget limit.
              </p>
            </div>
          </div>
          <Switch
            checked={budgetAlerts}
            onCheckedChange={() => handleToggle(setBudgetAlerts, "Budget alerts")}
          />
        </div>

        {/* Weekly Digest */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-0.5">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Weekly Financial Digest</p>
              <p className="text-xs text-muted-foreground">
                Receive weekly automated summary breakdown of cash flow and savings rate.
              </p>
            </div>
          </div>
          <Switch
            checked={weeklyDigest}
            onCheckedChange={() => handleToggle(setWeeklyDigest, "Weekly digest")}
          />
        </div>

        {/* Email Statements */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Monthly Email Statements</p>
              <p className="text-xs text-muted-foreground">
                Automated monthly PDF report of all transactions and budget comparisons.
              </p>
            </div>
          </div>
          <Switch
            checked={emailReports}
            onCheckedChange={() => handleToggle(setEmailReports, "Monthly email reports")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
