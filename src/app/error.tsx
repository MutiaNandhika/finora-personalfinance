"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-foreground">
      <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-card p-8 text-center shadow-xl space-y-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Something went wrong</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          An unexpected error occurred while rendering this view. Your financial records remain safe.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
          <Button onClick={() => reset()} size="sm" className="w-full sm:w-auto gap-1.5 font-semibold">
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Button asChild variant="outline" size="sm" className="w-full sm:w-auto gap-1.5">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
