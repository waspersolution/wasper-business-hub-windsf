
import { Card, CardContent } from "@/components/ui/card";

interface FinancialRatiosProps {
  currentAssets: number;
  currentLiabilities: number;
  totalLiabilities: number;
  totalEquity: number;
  totalAssets: number;
}

export function FinancialRatios({
  currentAssets,
  currentLiabilities,
  totalLiabilities,
  totalEquity,
  totalAssets
}: FinancialRatiosProps) {
  return (
    <Card>
      <CardContent className="pt-6">
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
