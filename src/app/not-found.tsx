import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-6 text-foreground">
      <div className="max-w-7xl mx-auto w-full">
        <BrandLogo showTagline size="sm" />
      </div>

      <div className="my-auto max-w-md mx-auto text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary text-2xl font-bold">
          404
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The page or financial ledger section you are looking for does not exist or has been moved.
        </p>
        <div className="pt-2 flex justify-center gap-2">
          <Button asChild size="sm" className="gap-1.5 font-semibold">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              <span>Return to Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Finora Personal Finance SaaS
      </div>
    </div>
  );
}
