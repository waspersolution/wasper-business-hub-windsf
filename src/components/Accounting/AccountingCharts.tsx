import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "@/components/charts";

const revenueData = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 145000 },
  { month: "Mar", revenue: 165000 },
  { month: "Apr", revenue: 155000 },
  { month: "May", revenue: 185000 },
  { month: "Jun", revenue: 195000 },
];

export function AccountingCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `₦${value.toLocaleString()}`}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
