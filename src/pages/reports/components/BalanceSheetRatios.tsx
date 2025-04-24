
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BalanceSheetData } from "../types/balance-sheet";

interface BalanceSheetRatiosProps {
  balanceSheetData: BalanceSheetData;
  totalLiabilities: number;
  totalEquity: number;
  totalAssets: number;
}

export function BalanceSheetRatios({ 
  balanceSheetData,
  totalLiabilities,
  totalEquity,
  totalAssets
}: BalanceSheetRatiosProps) {
  const currentAssets = balanceSheetData.assets
    .filter(item => item.category === "Current Assets")
    .reduce((sum, item) => sum + item.amount, 0);
    
  const currentLiabilities = balanceSheetData.liabilities
    .filter(item => item.category === "Current Liabilities")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Ratios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Current Ratio</span>
            <span className="font-medium">
              {(currentAssets / currentLiabilities).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Debt to Equity</span>
            <span className="font-medium">
              {(totalLiabilities / totalEquity).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Debt to Assets</span>
            <span className="font-medium">
              {(totalLiabilities / totalAssets).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
