
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, DollarSign, Layers, TrendingUp } from "lucide-react";

interface FinancialReportsNavProps {
  currentReport: 'trial-balance' | 'profit-loss' | 'balance-sheet' | 'cash-flow';
}

export function FinancialReportsNav({ currentReport }: FinancialReportsNavProps) {
  return (
    <Card>
      <CardContent className="py-4">
        <div className="text-sm font-medium mb-2">Financial Reports</div>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={currentReport === 'trial-balance' ? "default" : "outline"}
            className="flex items-center gap-1"
            asChild
          >
            <a href="/reports/trial-balance">
              <BarChart2 className="h-3.5 w-3.5" />
              <span>Trial Balance</span>
            </a>
          </Button>
          
          <Button 
            size="sm" 
            variant={currentReport === 'profit-loss' ? "default" : "outline"}
            className="flex items-center gap-1"
            asChild
          >
            <a href="/reports/profit-loss">
              <DollarSign className="h-3.5 w-3.5" />
              <span>P&L</span>
            </a>
          </Button>
          
          <Button 
            size="sm" 
            variant={currentReport === 'balance-sheet' ? "default" : "outline"}
            className="flex items-center gap-1"
            asChild
          >
            <a href="/reports/balance-sheet">
              <Layers className="h-3.5 w-3.5" />
              <span>Balance Sheet</span>
            </a>
          </Button>
          
          <Button 
            size="sm" 
            variant={currentReport === 'cash-flow' ? "default" : "outline"}
            className="flex items-center gap-1"
            asChild
          >
            <a href="/reports/cash-flow">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Cash Flow</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
