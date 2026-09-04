import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  href?: string;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({
  className,
  showTagline = false,
  href = "/dashboard",
  size = "md",
}: BrandLogoProps) {
  const sizeMap = {
    sm: {
      icon: "w-7 h-7 text-xs",
      text: "text-lg",
      wrapper: "gap-2",
    },
    md: {
      icon: "w-9 h-9 text-sm",
      text: "text-xl",
      wrapper: "gap-2.5",
    },
    lg: {
      icon: "w-11 h-11 text-base",
      text: "text-2xl",
      wrapper: "gap-3",
    },
  };

  const { icon, text, wrapper } = sizeMap[size];

  const content = (
    <div className={cn("flex items-center select-none group", wrapper, className)}>
      <div
        className={cn(
          "rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105",
          icon
        )}
      >
        <span className="tracking-tighter">Fi</span>
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-foreground",
            text
          )}
        >
          {APP_NAME}
        </span>
        {showTagline && (
          <span className="text-[11px] text-muted-foreground font-medium -mt-1">
            Personal Finance
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
