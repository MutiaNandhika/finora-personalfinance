import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CategoryBreakdownData } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { CategoryIcon } from "@/components/common/CategoryIcon";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface TopSpendingListProps {
  data: CategoryBreakdownData[];
  isLoading?: boolean;
}

export function TopSpendingList({ data, isLoading = false }: TopSpendingListProps) {
  return (
    <Card className="border-border/80 bg-card/60 backdrop-blur-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Top Spending Categories</CardTitle>
        <CardDescription className="text-xs">
          Ranked by highest accumulated expenditure
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            No expense records found for this period.
          </p>
        ) : (
          <div className="space-y-3.5">
            {data.slice(0, 5).map((cat, idx) => (
              <div key={cat.categoryId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-bold text-muted-foreground w-4">
                      #{idx + 1}
                    </span>
                    <CategoryIcon
                      iconName={cat.icon}
                      color={cat.color}
                      size="sm"
                    />
                    <span className="font-semibold text-foreground truncate">
                      {cat.categoryName}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-foreground">
                      {formatCurrency(cat.amount)}
                    </span>
                    <span className="text-[11px] text-muted-foreground ml-1.5">
                      ({cat.percentage}%)
                    </span>
                  </div>
                </div>
                <Progress
                  value={cat.percentage}
                  indicatorColor="bg-primary"
                  className="h-1.5"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
