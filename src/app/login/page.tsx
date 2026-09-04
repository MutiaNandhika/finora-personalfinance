"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertCircle, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { enableDemoMode } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!isSupabaseConfigured()) {
      // If Supabase not set up, provide friendly redirect to demo mode
      toast.info("Supabase credentials not detected in .env.local — entering Sandbox Demo Mode.");
      enableDemoMode();
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password");
        toast.error(error.message || "Login failed");
        return;
      }

      if (data.session) {
        toast.success("Welcome back to Finora!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 selection:bg-primary/20 selection:text-primary">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-2 max-w-7xl mx-auto w-full">
        <BrandLogo showTagline size="sm" />
        <ThemeToggle />
      </div>

      {/* Main Container */}
      <div className="flex items-center justify-center my-auto py-8">
        <div className="w-full max-w-md space-y-4">
          <Card className="border-border/80 bg-card/80 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">Sign In to Finora</CardTitle>
              <CardDescription className="text-xs">
                Enter your account credentials to access your financial dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {errorMessage && (
                <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Demo Sandbox Fast-Track */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  <span>Recruiter / Portfolio Reviewer?</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Click below to instantly launch the full interactive sandbox with pre-loaded demo transactions without signing up.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={enableDemoMode}
                  className="w-full border-amber-500/40 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold gap-1.5 h-8 text-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Launch Live Demo Sandbox</span>
                </Button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/60" />
                </div>
                <span className="relative bg-card px-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Or Sign In with Email
                </span>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...form.register("email")}
                    error={form.formState.errors.email?.message}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      Password
                    </label>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...form.register("password")}
                    error={form.formState.errors.password?.message}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full font-semibold shadow-xs"
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </form>
            </CardContent>

            <CardFooter className="justify-center border-t border-border/50 pt-4">
              <p className="text-xs text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-primary hover:underline"
                >
                  Create one now
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground p-2">
        Finora Personal Finance SaaS • Protected with Supabase RLS
      </div>
    </div>
  );
}
