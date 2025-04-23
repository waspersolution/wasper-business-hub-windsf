
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "₦2,450,000",
    change: "+12%",
    trend: "up",
  },
  {
    title: "Total Expenses",
    value: "₦1,850,000",
    change: "+8%",
    trend: "down",
  },
  {
    title: "Net Profit",
    value: "₦600,000",
    change: "+15%",
    trend: "up",
  },
];

export function AccountingMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.title} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className={`flex items-center ${
                metric.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
