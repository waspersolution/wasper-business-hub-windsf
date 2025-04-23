
import { Card, CardContent } from "@/components/ui/card";
import type { CashFlowItem } from "../types/financial-reports";
import { useCashFlowCalculations } from "../hooks/useCashFlowCalculations";

type CashFlowSummaryCardsProps = {
  data: CashFlowItem[];
};

export function CashFlowSummaryCards({ data }: CashFlowSummaryCardsProps) {
  const { getTotalByCategoryType } = useCashFlowCalculations();

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Operating Cash Flow</p>
              <p className="text-2xl font-bold">₦{getTotalByCategoryType(data, "Operating Activities").toLocaleString()}</p>
            </div>
            <div className="flex items-center bg-blue-200 dark:bg-blue-800 h-12 w-12 justify-center rounded-full">
              <span className="text-blue-700 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path></svg>
              </span>
            </div>
          </div>
          
          <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Investing Cash Flow</p>
              <p className="text-2xl font-bold">₦{Math.abs(getTotalByCategoryType(data, "Investing Activities")).toLocaleString()}</p>
            </div>
            <div className="flex items-center bg-green-200 dark:bg-green-800 h-12 w-12 justify-center rounded-full">
              <span className="text-green-700 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.2 20h15.6V4.2H4.2V20Z"></path><path d="M16 9h1"></path><path d="M12 9h1"></path><path d="M8 9h1"></path><path d="M16 13h1"></path><path d="M12 13h1"></path><path d="M8 13h1"></path><path d="M16 17h1"></path><path d="M12 17h1"></path><path d="M8 17h1"></path></svg>
              </span>
            </div>
          </div>
          
          <div className="flex justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Financing Cash Flow</p>
              <p className="text-2xl font-bold">₦{Math.abs(getTotalByCategoryType(data, "Financing Activities")).toLocaleString()}</p>
            </div>
            <div className="flex items-center bg-purple-200 dark:bg-purple-800 h-12 w-12 justify-center rounded-full">
              <span className="text-purple-700 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="m17 5-5-3-5 3"></path><path d="M19 15v6"></path><path d="M19 18h-7"></path><path d="M5 15v6"></path><path d="M5 9v6"></path><path d="M19 9v6"></path><path d="M12 19v3"></path><path d="m12 12-7-4"></path><path d="m12 12 7-4"></path></svg>
              </span>
            </div>
          </div>
          
          <div className="flex justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-200 dark:border-amber-800">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Cash Flow</p>
              <p className="text-2xl font-bold">₦{data.find(item => item.isGrandTotal)?.amount.toLocaleString() || 0}</p>
            </div>
            <div className="flex items-center bg-amber-200 dark:bg-amber-800 h-12 w-12 justify-center rounded-full">
              <span className="text-amber-700 dark:text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
