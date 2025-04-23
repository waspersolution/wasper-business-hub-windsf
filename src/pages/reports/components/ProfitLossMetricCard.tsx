
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProfitLossMetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: "blue" | "red" | "green";
}

export function ProfitLossMetricCard({ title, value, icon: Icon, variant }: ProfitLossMetricCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20",
    red: "bg-red-50 dark:bg-red-900/20",
    green: "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800",
  };

  const iconColorClasses = {
    blue: "bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300",
    red: "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300",
    green: "bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300",
  };

  return (
    <div className={cn("flex justify-between p-4 rounded-lg", colorClasses[variant])}>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className={cn("text-2xl font-bold", {
          "text-green-600": variant === "green" && value >= 0,
          "text-red-600": variant === "green" && value < 0,
        })}>
          ₦{value.toLocaleString()}
        </p>
      </div>
      <div className={cn("flex items-center h-12 w-12 justify-center rounded-full", iconColorClasses[variant])}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}
