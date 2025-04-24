
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BalanceSheetMetricsProps {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  liabilitiesAndEquity: number;
}

export function BalanceSheetMetrics({ 
  totalAssets, 
  totalLiabilities, 
  totalEquity,
  liabilitiesAndEquity 
}: BalanceSheetMetricsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
              <p className="text-2xl font-bold">₦{totalAssets.toLocaleString()}</p>
            </div>
            <div className="flex items-center bg-blue-200 dark:bg-blue-800 h-12 w-12 justify-center rounded-full">
              <span className="text-blue-700 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
              </span>
            </div>
          </div>

          <div className="flex justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Liabilities</p>
              <p className="text-2xl font-bold">₦{totalLiabilities.toLocaleString()}</p>
            </div>
            <div className="flex items-center bg-red-200 dark:bg-red-800 h-12 w-12 justify-center rounded-full">
              <span className="text-red-700 dark:text-red-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 18V9.75H7.5V18"></path><path d="M4.5 13.5H9"></path><path d="M12.75 18V12.75H15.75V18"></path><path d="M12.75 12.75V9.75H18V12.75"></path></svg>
              </span>
            </div>
          </div>

          <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Equity</p>
              <p className="text-2xl font-bold">₦{totalEquity.toLocaleString()}</p>
            </div>
            <div className="flex items-center bg-green-200 dark:bg-green-800 h-12 w-12 justify-center rounded-full">
              <span className="text-green-700 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-muted-foreground">Balance Check:</div>
            <div className={`font-medium ${Math.abs(totalAssets - liabilitiesAndEquity) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(totalAssets - liabilitiesAndEquity) < 0.01 ? 'Balanced ✓' : 'Not Balanced ✗'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
