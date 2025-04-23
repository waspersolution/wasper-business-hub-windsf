
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Plus, TrendingUp, DollarSign, Archive } from "lucide-react";

export function StockReportsTab() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Stock Reports</CardTitle>
              <CardDescription>Inventory analysis and stock management</CardDescription>
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
              <a href="/reports/stock">
                <BarChart2 className="h-8 w-8 mb-2 text-blue-500" />
                <span className="font-medium">Stock Summary</span>
                <span className="text-xs text-muted-foreground">Current inventory status</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
              <a href="/reports/stock-movement">
                <TrendingUp className="h-8 w-8 mb-2 text-green-500" />
                <span className="font-medium">Stock Movement</span>
                <span className="text-xs text-muted-foreground">Inventory flow analysis</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-200 dark:hover:border-purple-800" asChild>
              <a href="/reports/valuation">
                <DollarSign className="h-8 w-8 mb-2 text-purple-500" />
                <span className="font-medium">Valuation Report</span>
                <span className="text-xs text-muted-foreground">Inventory value assessment</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
              <a href="/reports/dead-stock">
                <Archive className="h-8 w-8 mb-2 text-amber-500" />
                <span className="font-medium">Dead Stock</span>
                <span className="text-xs text-muted-foreground">Non-moving inventory</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
