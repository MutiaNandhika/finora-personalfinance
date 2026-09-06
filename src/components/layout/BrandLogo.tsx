"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  href?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "badge" | "card";
}

export function BrandLogo({
  className,
  showTagline = false,
  href = "/dashboard",
  size = "md",
  variant = "default",
}: BrandLogoProps) {
  const sizeConfig = {
    xs: {
      width: 84,
      height: 28,
      fontSize: 12,
      letterSpacing: 2.4,
      yTop: 9,
      yBottom: 19,
      taglineClass: "text-[8px]",
    },
    sm: {
      width: 108,
      height: 36,
      fontSize: 15.5,
      letterSpacing: 3.2,
      yTop: 12,
      yBottom: 24,
      taglineClass: "text-[9px]",
    },
    md: {
      width: 132,
      height: 44,
      fontSize: 19,
      letterSpacing: 3.8,
      yTop: 14.5,
      yBottom: 29.5,
      taglineClass: "text-[10px]",
    },
    lg: {
      width: 168,
      height: 56,
      fontSize: 24,
      letterSpacing: 4.8,
      yTop: 18.5,
      yBottom: 37.5,
      taglineClass: "text-xs",
    },
    xl: {
      width: 228,
      height: 76,
      fontSize: 33,
      letterSpacing: 6.6,
      yTop: 25,
      yBottom: 51,
      taglineClass: "text-sm",
    },
  };

  const { width, height, fontSize, letterSpacing, yTop, yBottom, taglineClass } =
    sizeConfig[size] || sizeConfig.md;
  const centerX = width / 2;

  const logoSvg = (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="text-foreground transition-all duration-300 group-hover:opacity-85 shrink-0 select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Finora Logo"
    >
      {/* Top FINORA */}
      <text
        x={centerX}
        y={yTop}
        fill="currentColor"
        fontSize={fontSize}
        fontWeight="800"
        letterSpacing={letterSpacing}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontFamily:
            "var(--font-valley), 'Valley Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          textTransform: "uppercase",
        }}
      >
        FINORA
      </text>

      {/* Bottom FINORA (180-degree inverted mirror) */}
      <text
        x={centerX}
        y={yBottom}
        fill="currentColor"
        fontSize={fontSize}
        fontWeight="800"
        letterSpacing={letterSpacing}
        textAnchor="middle"
        dominantBaseline="central"
        transform={`rotate(180 ${centerX} ${yBottom})`}
        style={{
          fontFamily:
            "var(--font-valley), 'Valley Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          textTransform: "uppercase",
        }}
      >
        FINORA
      </text>
    </svg>
  );

  const content = (
    <div
      className={cn(
        "flex flex-col items-start select-none group focus-visible:outline-none transition-transform duration-200",
        variant === "badge" &&
          "px-3 py-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-xs backdrop-blur-xs hover:border-slate-300",
        variant === "card" &&
          "p-6 rounded-3xl bg-[#F6F5EE] dark:bg-[#111622] text-[#111827] dark:text-[#F6F5EE] shadow-lg flex items-center justify-center",
        className
      )}
    >
      {logoSvg}
      {showTagline && (
        <span
          className={cn(
            "font-extrabold uppercase tracking-widest text-[#F59E0B] opacity-90 mt-1 pl-0.5",
            taglineClass
          )}
        >
          Personal Finance
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl group"
      >
        {content}
      </Link>
    );
  }

  return content;
}
