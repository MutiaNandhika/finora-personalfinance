"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  ArrowRight,
  ShieldCheck,
  PieChart,
  Target,
  Sparkles,
  CheckCircle2,
  ReceiptText,
} from "lucide-react";

export default function LandingPage() {
  const { user, enableDemoMode } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <BrandLogo size="md" showTagline />

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <Button asChild size="sm" className="font-semibold shadow-xs">
                <Link href="/dashboard" className="flex items-center gap-1.5">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  size="sm"
                  onClick={enableDemoMode}
                  className="font-semibold gap-1.5 shadow-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Try Live Demo</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-16 px-6">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Production-Grade Personal Finance SaaS</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Take control of your money <br className="hidden sm:block" />
            with <span className="bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 bg-clip-text text-transparent">real-time precision</span>.
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Finora empowers you to track multi-category transactions, set monthly budgets with automated threshold warnings, and analyze your financial trajectory using deep visual charts.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              onClick={enableDemoMode}
              className="w-full sm:w-auto font-bold gap-2 text-base px-8 shadow-lg shadow-primary/25"
            >
              <Sparkles className="h-4 w-4" />
              <span>Explore Live Sandbox</span>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto font-semibold gap-2 text-base px-6"
            >
              <Link href="/register">
                <span>Create Free Account</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground mr-1">Engineered with:</span>
            {["Next.js 16 (App Router)", "TypeScript Strict", "Tailwind CSS", "Supabase PostgreSQL", "Row Level Security", "TanStack Query", "Recharts", "Zod Validation"].map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border bg-card/60 px-2.5 py-1 font-medium shadow-2xs backdrop-blur-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 px-6 border-t border-border/50 bg-muted/20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Built for real-world personal wealth tracking
            </h2>
            <p className="text-sm text-muted-foreground">
              A comprehensive suite of tools designed to replace messy spreadsheets with dynamic, connected finance management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-xs transition-all hover:shadow-md hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <ReceiptText className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Transaction Management</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Add, edit, filter, search, and categorize daily expenses and income. Real-time cashflow calculations formatted in Indonesian Rupiah (IDR).
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Instant search & multi-field filter</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Safe delete with confirmation dialog</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-xs transition-all hover:shadow-md hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Dynamic Budget Alerts</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Set monthly limits per category. Finora automatically recalculates your spent vs remaining amount and triggers warning states above 80%.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Month-by-month historical budget tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Color-coded normal, warning & exceeded states</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-xs transition-all hover:shadow-md hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <PieChart className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Recharts Analytics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Interactive area charts, donut breakdown, daily burn velocity, and top spending ranks across customizable time windows.
              </p>
              <ul className="space-y-1.5 pt-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Income vs Expense comparisons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Top categories & single largest expenses</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security & RLS Architecture Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Enterprise Database Security</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Powered by PostgreSQL Row Level Security (RLS)
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every transaction, budget, and profile record is strictly quarantined by PostgreSQL RLS policies ensuring that user data is mathematically unreachable by unauthorized requests.
              </p>
              <div className="pt-2">
                <Button asChild size="sm" variant="outline" className="font-semibold">
                  <Link href="/login">Get Started with Finora</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/40 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border/60 pb-2 text-[11px] text-muted-foreground">
                <span>supabase/schema.sql</span>
                <span className="text-emerald-500">ACTIVE RLS</span>
              </div>
              <p className="text-muted-foreground">
                <span className="text-indigo-500">CREATE POLICY</span> &quot;Users can view own transactions&quot; <br />
                <span className="text-indigo-500">ON</span> public.transactions <br />
                <span className="text-indigo-500">FOR SELECT</span> <br />
                <span className="text-indigo-500">USING</span> (auth.uid() = user_id);
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/60 bg-card py-8 px-6 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrandLogo size="sm" />
            <span>— Personal Finance Management</span>
          </div>
          <p>© {new Date().getFullYear()} Finora. Developed for Frontend Developer Portfolio.</p>
        </div>
      </footer>
    </div>
  );
}
