import React from "react";
import { CATEGORY_ICONS_MAP } from "@/lib/constants";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryIconProps {
  iconName?: string | null;
  color?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CategoryIcon({
  iconName,
  color = "#6366F1",
  className,
  size = "md",
}: CategoryIconProps) {
  const IconComponent = (iconName && CATEGORY_ICONS_MAP[iconName]) || Tag;

  const sizeClasses = {
    sm: "h-7 w-7 rounded-lg p-1.5 text-xs",
    md: "h-9 w-9 rounded-xl p-2 text-sm",
    lg: "h-11 w-11 rounded-xl p-2.5 text-base",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: color ? `${color}18` : "#6366F118",
        color: color || "#6366F1",
      }}
    >
      <IconComponent className={iconSizes[size]} />
    </div>
  );
}
