
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitLossMetricCard } from "./ProfitLossMetricCard";
import { BanknoteIcon, CreditCard, TrendingUp } from "lucide-react";

interface ProfitLossMetricsProps {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: string;
}

export function ProfitLossMetrics({ totalRevenue, totalExpenses, netProfit, profitMargin }: ProfitLossMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <ProfitLossMetricCard
            title="Total Revenue"
            value={totalRevenue}
            icon={BanknoteIcon}
            variant="blue"
          />
          <ProfitLossMetricCard
            title="Total Expenses"
            value={totalExpenses}
            icon={CreditCard}
            variant="red"
          />
          <ProfitLossMetricCard
            title="Net Profit"
            value={netProfit}
            icon={TrendingUp}
            variant="green"
          />
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-muted-foreground">Profit Margin:</div>
            <div className="font-medium">{profitMargin}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
