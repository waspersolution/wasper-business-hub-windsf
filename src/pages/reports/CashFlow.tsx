import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { CashFlowTable } from "./components/tables/CashFlowTable";
import { CashFlowSummaryCards } from "./components/CashFlowSummaryCards";
import { CashFlowChart } from "./components/CashFlowChart";
import { useChartTransformations } from "./hooks/useChartTransformations";
import type { CashFlowItem, MonthlyData } from "./types/financial-reports";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/charts";

const cashFlowData: CashFlowItem[] = [
  { category: "Operating Activities", item: "Net Income", amount: 48500 },
  { category: "Operating Activities", item: "Depreciation", amount: 12500 },
  { category: "Operating Activities", item: "Increase in Accounts Receivable", amount: -15000 },
  { category: "Operating Activities", item: "Decrease in Inventory", amount: 8000 },
  { category: "Operating Activities", item: "Increase in Accounts Payable", amount: 12500 },
  { category: "Operating Activities", item: "Net Cash from Operating Activities", amount: 66500, isTotal: true },
  { category: "Investing Activities", item: "Purchase of Equipment", amount: -35000 },
  { category: "Investing Activities", item: "Sale of Investments", amount: 10000 },
  { category: "Investing Activities", item: "Net Cash used in Investing Activities", amount: -25000, isTotal: true },
  { category: "Financing Activities", item: "Loan Repayments", amount: -15000 },
  { category: "Financing Activities", item: "Dividends Paid", amount: -10000 },
  { category: "Financing Activities", item: "Net Cash used in Financing Activities", amount: -25000, isTotal: true },
  { category: "", item: "Net Increase in Cash", amount: 16500, isGrandTotal: true },
  { category: "", item: "Cash at Beginning of Period", amount: 173500, isInfo: true },
  { category: "", item: "Cash at End of Period", amount: 190000, isInfo: true },
];

const monthlyCashFlowData: MonthlyData[] = [
  { 
    month: "Jan", 
    operating: 62000, 
    investing: -22000, 
    financing: -18000, 
    netCashFlow: 22000 
  },
  { 
    month: "Feb", 
    operating: 64500, 
    investing: -24000, 
    financing: -20000, 
    netCashFlow: 20500 
  },
  { 
    month: "Mar", 
    operating: 68000, 
    investing: -26000, 
    financing: -22000, 
    netCashFlow: 20000 
  },
  { 
    month: "Apr", 
    operating: 66500, 
    investing: -25000, 
    financing: -25000, 
    netCashFlow: 16500 
  },
  { 
    month: "May", 
    operating: 70000, 
    investing: -28000, 
    financing: -23000, 
    netCashFlow: 19000 
  },
  { 
    month: "Jun", 
    operating: 72000, 
    investing: -30000, 
    financing: -20000, 
    netCashFlow: 22000 
  },
];

export default function CashFlow() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCashFlowData = cashFlowData.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
    
  const { tooltipFormatter } = useChartTransformations();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ReportPageHeader 
          title="Cash Flow Statement"
          description="Analyze your company's cash inflows and outflows"
        />

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
        />

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <Card className="lg:col-span-4 overflow-hidden">
            <CashFlowTable data={filteredCashFlowData} />
          </Card>
          
          <div className="lg:col-span-3 space-y-4">
            <CashFlowSummaryCards data={filteredCashFlowData} />
            <CashFlowChart data={monthlyCashFlowData} tooltipFormatter={tooltipFormatter} />
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
