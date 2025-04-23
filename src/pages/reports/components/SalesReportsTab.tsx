
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Calendar, Plus, TrendingUp, Users } from "lucide-react";

export function SalesReportsTab() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Reports</CardTitle>
              <CardDescription>Analyze your sales data by different metrics</CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
              <a href="/reports/sales">
                <BarChart2 className="h-8 w-8 mb-2 text-blue-500" />
                <span className="font-medium">Sales Summary</span>
                <span className="text-xs text-muted-foreground">Monthly sales overview</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
              <a href="/reports/sales-periods">
                <Calendar className="h-8 w-8 mb-2 text-green-500" />
                <span className="font-medium">Daily/Weekly/Monthly</span>
                <span className="text-xs text-muted-foreground">Period-based analysis</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-200 dark:hover:border-purple-800" asChild>
              <a href="/reports/top-products">
                <TrendingUp className="h-8 w-8 mb-2 text-purple-500" />
                <span className="font-medium">Top Selling Products</span>
                <span className="text-xs text-muted-foreground">Best performing inventory</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
              <a href="/reports/customer-summary">
                <Users className="h-8 w-8 mb-2 text-amber-500" />
                <span className="font-medium">Customer Summary</span>
                <span className="text-xs text-muted-foreground">Customer purchasing patterns</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
