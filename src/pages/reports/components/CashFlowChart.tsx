
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";
import type { MonthlyData } from "../types/financial-reports";

type CashFlowChartProps = {
  data: MonthlyData[];
  tooltipFormatter: (value: number | string | Array<number | string>) => [string, string];
};

export function CashFlowChart({ data, tooltipFormatter }: CashFlowChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>6-Month Cash Flow Trend</CardTitle>
        <CardDescription>Monthly breakdown by activity type</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line type="monotone" dataKey="operating" stroke="#4f46e5" strokeWidth={2} name="Operating" />
            <Line type="monotone" dataKey="investing" stroke="#10b981" strokeWidth={2} name="Investing" />
            <Line type="monotone" dataKey="financing" stroke="#8b5cf6" strokeWidth={2} name="Financing" />
            <Line type="monotone" dataKey="netCashFlow" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Net Cash Flow" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
