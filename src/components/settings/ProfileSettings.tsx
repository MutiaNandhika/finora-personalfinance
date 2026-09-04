"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormValues } from "@/lib/validations/profile";
import { useProfile } from "@/lib/queries/useProfile";
import { useAuth } from "@/components/providers/AuthProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Select } from "@/components/ui/select";
import { User, Mail, DollarSign } from "lucide-react";

export function ProfileSettings() {
  const { profile, updateProfile, isUpdating } = useProfile();
  const { user } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      currency: "IDR",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name || "",
        currency: profile.currency || "IDR",
      });
    }
  }, [profile, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile({
        full_name: values.full_name,
        currency: values.currency,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "User";
  const displayEmail = profile?.email || user?.email || "user@finora.io";

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Personal Profile</CardTitle>
        <CardDescription className="text-xs">
          Manage your personal information and default currency settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Display */}
        <div className="flex items-center gap-4 pb-4 border-b border-border/50">
          <Avatar
            src={profile?.avatar_url}
            fallbackText={displayName}
            size="lg"
            className="ring-4 ring-primary/10"
          />
          <div>
            <h4 className="font-semibold text-foreground text-sm">{displayName}</h4>
            <p className="text-xs text-muted-foreground">{displayEmail}</p>
            <span className="text-[10px] text-primary font-medium mt-1 inline-block">
              Primary Finora Account
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                {...form.register("full_name")}
                error={form.formState.errors.full_name?.message}
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                Email Address
              </label>
              <Input
                type="email"
                value={displayEmail}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Currency Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                Primary Currency
              </label>
              <Select {...form.register("currency")}>
                <option value="IDR">IDR — Indonesian Rupiah (Rp)</option>
                <option value="USD">USD — US Dollar ($)</option>
                <option value="SGD">SGD — Singapore Dollar (S$)</option>
              </Select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              isLoading={isUpdating}
              size="sm"
              className="font-semibold shadow-xs"
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
