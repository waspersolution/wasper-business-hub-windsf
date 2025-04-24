
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";
import type { MonthlyProfitData } from "../types/financial-reports";
import { cn } from "@/lib/utils";

type ProfitLossChartProps = {
  data: MonthlyProfitData[];
  tooltipFormatter: (value: number | string | Array<number | string>) => [string, string];
};

export function ProfitLossChart({ data, tooltipFormatter }: ProfitLossChartProps) {
  // Calculate the latest financial metrics
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  
  const revenueGrowth = previousData 
    ? ((latestData.revenue - previousData.revenue) / previousData.revenue * 100).toFixed(1)
    : "0";
  
  const profitGrowth = previousData
    ? ((latestData.profit - previousData.profit) / previousData.profit * 100).toFixed(1)
    : "0";

  return (
    <Card className="space-y-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>6-Month Profit Trend</CardTitle>
            <CardDescription>Monthly revenue, expenses, and profit analysis</CardDescription>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Revenue Growth</p>
              <p className={cn("text-xl font-bold", 
                Number(revenueGrowth) > 0 ? "text-green-600" : "text-red-600"
              )}>
                {revenueGrowth}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Profit Growth</p>
              <p className={cn("text-xl font-bold", 
                Number(profitGrowth) > 0 ? "text-green-600" : "text-red-600"
              )}>
                {profitGrowth}%
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={{ strokeWidth: 1 }}
              />
              <YAxis 
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`}
                tickLine={false}
                axisLine={{ strokeWidth: 1 }}
              />
              <Tooltip 
                formatter={tooltipFormatter}
                contentStyle={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '6px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4f46e5" 
                strokeWidth={2.5} 
                name="Revenue"
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2.5} 
                name="Expenses"
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={2.5} 
                name="Profit"
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Latest Revenue</p>
            <p className="text-lg font-bold">₦{latestData.revenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Latest Expenses</p>
            <p className="text-lg font-bold">₦{latestData.expenses.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Latest Profit</p>
            <p className={cn("text-lg font-bold", 
              latestData.profit > 0 ? "text-green-600" : "text-red-600"
            )}>
              ₦{latestData.profit.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
