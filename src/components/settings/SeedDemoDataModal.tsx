"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { seedLiveDatabase } from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface SeedDemoDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SeedDemoDataModal({ open, onOpenChange }: SeedDemoDataModalProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSeed = async () => {
    setIsLoading(true);
    try {
      const res = await seedLiveDatabase(user?.id || "demo-user-id");
      if (res.success) {
        toast.success(res.message);
        queryClient.invalidateQueries();
        onOpenChange(false);
      } else {
        toast.error(res.message);
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Failed to seed demo data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Populate Sample Portfolio Data</DialogTitle>
              <DialogDescription className="mt-1">
                Instantly fill your account with realistic fintech data for showcasing in portfolio reviews.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2 py-2 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>13 Default Expense & Income Categories with icons</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>15+ Realistic transactions (Salary, Freelance, Groceries, Bills, Tech)</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>6 Active monthly category budgets with calculated progress</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Historical cashflow data for area & trend analytics</span>
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSeed}
            isLoading={isLoading}
            className="font-semibold gap-1.5"
          >
            <Sparkles className="h-4 w-4" />
            Seed Account Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
