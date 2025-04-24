
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { ProfitLossTab } from "./components/ProfitLossTab";
import { useProfitLossCalculations } from "./hooks/useProfitLossCalculations";
import { ProfitLossMetrics } from "./components/ProfitLossMetrics";
import { ExpenseBreakdown } from "./components/ExpenseBreakdown";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportsNav } from "./components/FinancialReportsNav";
import { ProfitLossChart } from "./components/ProfitLossChart";
import { useChartTransformations } from "./hooks/useChartTransformations";
import type { ProfitLossItem } from "./types/financial-reports";
import { profitLossData, monthlyProfitData } from "./data/profitLossData";

export default function ProfitLoss() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProfitLoss = profitLossData.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const { totals, netProfit, profitMargin } = useProfitLossCalculations(filteredProfitLoss);
  const expenseItems = filteredProfitLoss.filter(item => item.category === "Expenses");
  const { tooltipFormatter, formatProfitChartData } = useChartTransformations();
  const formattedChartData = formatProfitChartData(monthlyProfitData);
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ReportPageHeader 
          title="Profit & Loss Statement"
          description="Analyze your company's financial performance"
        />

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
        />

        <FinancialReportsNav currentReport="profit-loss" />

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <Card className="lg:col-span-4 overflow-hidden">
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>
                For the period ending {period === "2025-04" ? "April 30, 2025" : period}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ProfitLossTab 
                data={filteredProfitLoss} 
                monthlyData={formattedChartData}
                period={period}
              />
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-4">
            <ProfitLossMetrics
              totalRevenue={totals.revenue}
              totalExpenses={totals.expenses}
              netProfit={netProfit}
              profitMargin={profitMargin}
            />
            
            <ProfitLossChart 
              data={formattedChartData}
              tooltipFormatter={tooltipFormatter}
            />

            <ExpenseBreakdown 
              expenses={expenseItems}
              totalExpenses={totals.expenses}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">Save as Favorite</Button>
          <Button variant="outline">Schedule Report</Button>
          <Button>Generate Detailed Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
