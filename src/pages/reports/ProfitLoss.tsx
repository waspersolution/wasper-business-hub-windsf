import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Download, Filter, Printer } from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { ProfitLossTab } from "./components/ProfitLossTab";
import { useProfitLossCalculations } from "./hooks/useProfitLossCalculations";
import { ProfitLossMetrics } from "./components/ProfitLossMetrics";
import { ExpenseBreakdown } from "./components/ExpenseBreakdown";
import type { ProfitLossItem, MonthlyProfitData } from "./types/financial-reports";
import { profitLossData, monthlyProfitData } from "./data/profitLossData";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";

export default function ProfitLoss() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [comparison, setComparison] = useState("previous-period");
  
  const filteredProfitLoss = profitLossData.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const { totals, netProfit, profitMargin } = useProfitLossCalculations(filteredProfitLoss);
  const expenseItems = filteredProfitLoss.filter(item => item.category === "Expenses");
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profit & Loss Statement</h1>
            <p className="text-muted-foreground mt-1">
              Analyze your company's financial performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
        />

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
                monthlyData={monthlyProfitData}
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
            
            <Card>
              <CardHeader>
                <CardTitle>6-Month Profit Trend</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProfitData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

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
