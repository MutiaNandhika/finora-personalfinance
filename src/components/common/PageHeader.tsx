import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800",
        className
      )}
    >
      <div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E293B] dark:text-white leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 font-medium mt-0.5">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2.5 flex-wrap">{action}</div>}
    </div>
  );
}
