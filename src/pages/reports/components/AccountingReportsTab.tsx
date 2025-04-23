
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Plus, DollarSign, Layers, Book, TrendingUp } from "lucide-react";

export function AccountingReportsTab() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Accounting Reports</CardTitle>
              <CardDescription>Financial statements and analysis</CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <a href="/reports/financials">
                <Plus className="h-4 w-4" />
                View All Financial Reports
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
              <a href="/reports/trial-balance">
                <BarChart2 className="h-8 w-8 mb-2 text-blue-500" />
                <span className="font-medium">Trial Balance</span>
                <span className="text-xs text-muted-foreground">Account balances</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
              <a href="/reports/profit-loss">
                <DollarSign className="h-8 w-8 mb-2 text-green-500" />
                <span className="font-medium">Profit & Loss</span>
                <span className="text-xs text-muted-foreground">Income statement</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-200 dark:hover:border-purple-800" asChild>
              <a href="/reports/balance-sheet">
                <Layers className="h-8 w-8 mb-2 text-purple-500" />
                <span className="font-medium">Balance Sheet</span>
                <span className="text-xs text-muted-foreground">Financial position</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
              <a href="/reports/cash-flow">
                <TrendingUp className="h-8 w-8 mb-2 text-amber-500" />
                <span className="font-medium">Cash Flow</span>
                <span className="text-xs text-muted-foreground">Cash movements</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
              <a href="/reports/journal">
                <Book className="h-8 w-8 mb-2 text-amber-500" />
                <span className="font-medium">Journal Report</span>
                <span className="text-xs text-muted-foreground">Transaction details</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
