"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const themes = [
    {
      id: "light",
      label: "Light Mode",
      description: "Clean, crisp daytime aesthetic",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Dark Mode",
      description: "High contrast, battery-friendly fintech theme",
      icon: Moon,
    },
    {
      id: "system",
      label: "System Match",
      description: "Sync automatically with OS preferences",
      icon: Laptop,
    },
  ];

  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Appearance & Theme</CardTitle>
        <CardDescription className="text-xs">
          Customize the visual interface of your Finora dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((t) => {
            const isSelected = theme === t.id;
            const Icon = t.icon;

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`relative flex flex-col items-start p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                    : "border-border hover:border-border/80 bg-card hover:bg-muted/40"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground mb-3">
                  <Icon className="h-4 w-4" />
                </div>

                <span className="font-semibold text-sm text-foreground">{t.label}</span>
                <span className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {t.description}
                </span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
