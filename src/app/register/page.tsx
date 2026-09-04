"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/services/api";
import { useAuth } from "@/components/providers/AuthProvider";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { enableDemoMode } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    if (!isSupabaseConfigured()) {
      toast.info("Supabase not yet configured — activating local demo mode.");
      enableDemoMode();
      return;
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.full_name,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed");
        toast.error(error.message || "Failed to create account");
        return;
      }

      if (data.user) {
        // If email confirmation is required by Supabase project
        if (data.session) {
          toast.success("Account registered successfully! Welcome to Finora.");
          router.push("/dashboard");
          router.refresh();
        } else {
          setIsSuccess(true);
          toast.success("Confirmation link sent to your email!");
        }
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

      {/* Form Container */}
      <div className="flex items-center justify-center my-auto py-8">
        <div className="w-full max-w-md space-y-4">
          <Card className="border-border/80 bg-card/80 backdrop-blur-md shadow-xl">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight">Create Finora Account</CardTitle>
              <CardDescription className="text-xs">
                Start tracking and controlling your wealth with real-time analytics
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {isSuccess ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-foreground">Check your inbox</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We sent a confirmation link to{" "}
                    <span className="font-semibold text-foreground">{form.getValues("email")}</span>.
                    Please confirm your email to sign in.
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                    <Link href="/login">Return to Sign In</Link>
                  </Button>
                </div>
              ) : (
                <>
                  {errorMessage && (
                    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        Full Name
                      </label>
                      <Input
                        placeholder="Alex Pratama"
                        {...form.register("full_name")}
                        error={form.formState.errors.full_name?.message}
                      />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        Password
                      </label>
                      <Input
                        type="password"
                        placeholder="At least 8 chars, 1 uppercase & 1 number"
                        {...form.register("password")}
                        error={form.formState.errors.password?.message}
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Re-enter password"
                        {...form.register("confirm_password")}
                        error={form.formState.errors.confirm_password?.message}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full font-semibold shadow-xs"
                      isLoading={isLoading}
                    >
                      Create Account
                    </Button>
                  </form>
                </>
              )}
            </CardContent>

            <CardFooter className="justify-center border-t border-border/50 pt-4">
              <p className="text-xs text-muted-foreground">
                Already registered?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground p-2">
        Finora Personal Finance SaaS • Secured by PostgreSQL RLS
      </div>
    </div>
  );
}
