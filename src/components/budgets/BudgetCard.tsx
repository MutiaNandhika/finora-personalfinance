import React from "react";
import { BudgetWithProgress } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

interface BudgetCardProps {
  budget: BudgetWithProgress;
  onEdit: (budget: BudgetWithProgress) => void;
  onDelete: (budget: BudgetWithProgress) => void;
}

export function BudgetCard({ budget, onEdit, onDelete }: BudgetCardProps) {
  const isExceeded = budget.status === "exceeded";
  const isWarning = budget.status === "warning";

  let statusBadge = (
    <Badge variant="success" className="gap-1 text-[10px]">
      <CheckCircle2 className="h-3 w-3" />
      On Track
    </Badge>
  );
  let progressColor = "bg-primary";
  let borderHighlight = "border-border";

  if (isExceeded) {
    statusBadge = (
      <Badge variant="destructive" className="gap-1 text-[10px]">
        <AlertCircle className="h-3 w-3" />
        Exceeded
      </Badge>
    );
    progressColor = "bg-rose-500";
    borderHighlight = "border-rose-500/40 dark:border-rose-500/30";
  } else if (isWarning) {
    statusBadge = (
      <Badge variant="warning" className="gap-1 text-[10px]">
        <AlertTriangle className="h-3 w-3" />
        Warning ({budget.percentage}%)
      </Badge>
    );
    progressColor = "bg-amber-500";
    borderHighlight = "border-amber-500/40 dark:border-amber-500/30";
  }

  return (
    <Card className={`border ${borderHighlight} bg-card/70 backdrop-blur-xs transition-all hover:shadow-md`}>
      <CardContent className="p-5 space-y-4">
        {/* Top: Category Icon + Title + Status + Action Buttons */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <CategoryIcon
              iconName={budget.category?.icon}
              color={budget.category?.color}
              size="md"
            />
            <div className="min-w-0">
              <h4 className="text-sm md:text-base font-bold text-foreground truncate">
                {budget.category?.name}
              </h4>
              <div className="mt-1">{statusBadge}</div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(budget)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Edit budget"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(budget)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              aria-label="Delete budget"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Middle: Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">Progress</span>
            <span className="font-bold text-foreground">{budget.percentage}%</span>
          </div>
          <Progress value={budget.percentage} indicatorColor={progressColor} className="h-2.5" />
        </div>

        {/* Bottom: Spent vs Budget Limit Numbers */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50 text-xs">
          <div>
            <span className="text-[11px] text-muted-foreground block">Spent</span>
            <span className="font-bold text-foreground line-clamp-1">
              {formatCurrency(budget.spent)}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-muted-foreground block">Limit</span>
            <span className="font-bold text-foreground line-clamp-1">
              {formatCurrency(budget.amount)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-muted-foreground block">
              {isExceeded ? "Over Budget" : "Remaining"}
            </span>
            <span
              className={`font-bold line-clamp-1 ${
                isExceeded
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {formatCurrency(Math.abs(budget.remaining))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
