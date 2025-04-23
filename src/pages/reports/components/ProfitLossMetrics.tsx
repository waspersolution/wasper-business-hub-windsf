
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfitLossMetricCard } from "./ProfitLossMetricCard";

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
            icon={() => (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7c0-1.7-1.3-3-3-3h-1a3 3 0 0 0-3 3v6h4"></path><path d="M5 7c0-1.7 1.3-3 3-3h1a3 3 0 0 1 3 3v6h-4"></path><path d="M5 13v3c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3v-3"></path></svg>
            )}
            variant="blue"
          />
          <ProfitLossMetricCard
            title="Total Expenses"
            value={totalExpenses}
            icon={() => (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
            )}
            variant="red"
          />
          <ProfitLossMetricCard
            title="Net Profit"
            value={netProfit}
            icon={() => (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 14-8-8-8 8"></path><path d="M16 18H8a4 4 0 0 1 0-8h8"></path></svg>
            )}
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
