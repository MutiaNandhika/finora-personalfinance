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
      width: 76,
      height: 26,
      fontSize: 11.5,
      letterSpacing: 2.2,
      yTop: 8.5,
      yBottom: 17.5,
      taglineClass: "text-[8.5px]",
    },
    sm: {
      width: 104,
      height: 36,
      fontSize: 15.5,
      letterSpacing: 3.0,
      yTop: 12,
      yBottom: 24,
      taglineClass: "text-[9.5px]",
    },
    md: {
      width: 132,
      height: 46,
      fontSize: 19.5,
      letterSpacing: 3.8,
      yTop: 15.5,
      yBottom: 30.5,
      taglineClass: "text-[11px]",
    },
    lg: {
      width: 168,
      height: 58,
      fontSize: 25,
      letterSpacing: 4.8,
      yTop: 19.5,
      yBottom: 38.5,
      taglineClass: "text-xs",
    },
    xl: {
      width: 220,
      height: 76,
      fontSize: 33,
      letterSpacing: 6.4,
      yTop: 25.5,
      yBottom: 50.5,
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
      className="text-foreground transition-all duration-300 group-hover:opacity-80 shrink-0"
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
            "var(--font-sans), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          textTransform: "uppercase",
        }}
      >
        FINORA
      </text>

      {/* Bottom FINORA (180-degree inverted mirror lockup) */}
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
            "var(--font-sans), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
          "px-3 py-2 rounded-xl border border-border/70 bg-card/80 shadow-xs backdrop-blur-xs hover:border-border",
        variant === "card" &&
          "p-6 rounded-2xl bg-[#F6F5EE] dark:bg-[#111622] text-[#111827] dark:text-[#F6F5EE] shadow-lg flex items-center justify-center",
        className
      )}
    >
      {logoSvg}
      {showTagline && (
        <span
          className={cn(
            "font-semibold tracking-widest text-muted-foreground uppercase opacity-75 mt-1 pl-0.5",
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
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg group"
      >
        {content}
      </Link>
    );
  }

  return content;
}
