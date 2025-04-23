
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, DollarSign, Layers, TrendingUp } from "lucide-react";

export function FinancialReportsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            Trial Balance
          </CardTitle>
          <CardDescription>Account balances summary</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            View a snapshot of all your accounts with their debit and credit balances.
          </p>
          <Button className="w-full" asChild>
            <a href="/reports/trial-balance">View Trial Balance</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            Profit & Loss
          </CardTitle>
          <CardDescription>Income statement</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Analyze your revenue, expenses, and overall profitability for the period.
          </p>
          <Button className="w-full" asChild>
            <a href="/reports/profit-loss">View P&L Statement</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Balance Sheet
          </CardTitle>
          <CardDescription>Financial position</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Examine your assets, liabilities, and equity at a specific point in time.
          </p>
          <Button className="w-full" asChild>
            <a href="/reports/balance-sheet">View Balance Sheet</a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-amber-500" />
            Cash Flow
          </CardTitle>
          <CardDescription>Cash movement</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Track the inflows and outflows of cash within your business operations.
          </p>
          <Button className="w-full" asChild>
            <a href="/reports/cash-flow">View Cash Flow</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
