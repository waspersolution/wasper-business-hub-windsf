
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CashFlowItem } from "../types/financial-reports";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

type CashFlowSummaryCardsProps = {
  data: CashFlowItem[];
};

export function CashFlowSummaryCards({ data }: CashFlowSummaryCardsProps) {
  // Find specific totals
  const operatingTotal = data.find(
    item => item.category === "Operating Activities" && item.isTotal
  )?.amount || 0;
  
  const investingTotal = data.find(
    item => item.category === "Investing Activities" && item.isTotal
  )?.amount || 0;
  
  const financingTotal = data.find(
    item => item.category === "Financing Activities" && item.isTotal
  )?.amount || 0;
  
  const netCashFlow = data.find(item => item.isGrandTotal)?.amount || 0;
  const endingBalance = data.find(item => item.item === "Cash at End of Period")?.amount || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Net Cash Flow</CardTitle>
          <CardDescription>Current period</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">₦{netCashFlow.toLocaleString()}</span>
            <span className={`p-2 rounded-full ${netCashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {netCashFlow >= 0 ? 
                <TrendingUp className="h-5 w-5 text-green-600" /> : 
                <TrendingDown className="h-5 w-5 text-red-600" />}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Ending Cash Balance</CardTitle>
          <CardDescription>As of period end</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">₦{endingBalance.toLocaleString()}</span>
            <span className="p-2 rounded-full bg-blue-100">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="sm:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Cash Flow Breakdown</CardTitle>
          <CardDescription>By activity type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Operating</p>
              <p className={`text-lg font-bold ${operatingTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₦{Math.abs(operatingTotal).toLocaleString()}
                {operatingTotal < 0 && " (-)"}
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Investing</p>
              <p className={`text-lg font-bold ${investingTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₦{Math.abs(investingTotal).toLocaleString()}
                {investingTotal < 0 && " (-)"}
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <p className="text-sm font-medium text-muted-foreground">Financing</p>
              <p className={`text-lg font-bold ${financingTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₦{Math.abs(financingTotal).toLocaleString()}
                {financingTotal < 0 && " (-)"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
