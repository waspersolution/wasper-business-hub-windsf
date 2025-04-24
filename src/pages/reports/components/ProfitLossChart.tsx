
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";
import type { MonthlyProfitData } from "../types/financial-reports";

type ProfitLossChartProps = {
  data: MonthlyProfitData[];
  tooltipFormatter: (value: number | string | Array<number | string>) => [string, string];
};

export function ProfitLossChart({ data, tooltipFormatter }: ProfitLossChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>6-Month Profit Trend</CardTitle>
        <CardDescription>Monthly revenue, expenses, and profit analysis</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#4f46e5" 
              strokeWidth={2} 
              name="Revenue"
              dot={{ strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              strokeWidth={2} 
              name="Expenses"
              dot={{ strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="profit" 
              stroke="#10b981" 
              strokeWidth={2} 
              name="Profit"
              dot={{ r: 4, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
