
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";

interface MonthlyData {
  month: string;
  assets: number;
  liabilities: number;
  equity: number;
}

interface BalanceSheetChartProps {
  data: MonthlyData[];
}

export function BalanceSheetChart({ data }: BalanceSheetChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>6-Month Trend</CardTitle>
        <CardDescription>Assets, Liabilities & Equity</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, '']} />
            <Legend />
            <Line type="monotone" dataKey="assets" stroke="#4f46e5" strokeWidth={2} name="Assets" />
            <Line type="monotone" dataKey="liabilities" stroke="#ef4444" strokeWidth={2} name="Liabilities" />
            <Line type="monotone" dataKey="equity" stroke="#10b981" strokeWidth={2} name="Equity" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
