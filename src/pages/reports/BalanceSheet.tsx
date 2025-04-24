import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportsNav } from "./components/FinancialReportsNav";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { BalanceSheetHeader } from "./components/balance-sheet/BalanceSheetHeader";
import { BalanceSheetMetrics } from "./components/balance-sheet/BalanceSheetMetrics";
import { BalanceSheetChart } from "./components/balance-sheet/BalanceSheetChart";
import { BalanceSheetTable } from "./components/balance-sheet/BalanceSheetTable";
import { FinancialRatios } from "./components/balance-sheet/FinancialRatios";

// Mock data for balance sheet
const balanceSheetData = {
  assets: [
    { category: "Current Assets", item: "Cash", amount: 190000 },
    { category: "Current Assets", item: "Accounts Receivable", amount: 87500 },
    { category: "Current Assets", item: "Inventory", amount: 145000 },
    { category: "Current Assets", item: "Prepaid Expenses", amount: 12500 },
    { category: "Current Assets", item: "Other Current Assets", amount: 8500 },
    { category: "Fixed Assets", item: "Property & Equipment", amount: 325000 },
    { category: "Fixed Assets", item: "Less: Accumulated Depreciation", amount: -75000 },
    { category: "Fixed Assets", item: "Intangible Assets", amount: 120000 },
    { category: "Other Assets", item: "Long-term Investments", amount: 200000 },
    { category: "Other Assets", item: "Other Non-current Assets", amount: 15000 },
  ],
  liabilities: [
    { category: "Current Liabilities", item: "Accounts Payable", amount: 45000 },
    { category: "Current Liabilities", item: "Short-term Loans", amount: 75000 },
    { category: "Current Liabilities", item: "Current Portion of Long-term Debt", amount: 25000 },
    { category: "Current Liabilities", item: "Accrued Expenses", amount: 18500 },
    { category: "Current Liabilities", item: "Taxes Payable", amount: 32500 },
    { category: "Current Liabilities", item: "Deferred Revenue", amount: 22000 },
    { category: "Long-term Liabilities", item: "Long-term Debt", amount: 280000 },
    { category: "Long-term Liabilities", item: "Deferred Tax Liabilities", amount: 35000 },
    { category: "Long-term Liabilities", item: "Other Long-term Liabilities", amount: 17500 },
  ],
  equity: [
    { category: "Equity", item: "Common Stock", amount: 100000 },
    { category: "Equity", item: "Additional Paid-in Capital", amount: 150000 },
    { category: "Equity", item: "Retained Earnings", amount: 182000 },
    { category: "Equity", item: "Other Comprehensive Income", amount: 8500 },
  ]
};

// Monthly asset data for chart
const monthlyAssetData = [
  { month: "Jan", assets: 750000, liabilities: 510000, equity: 240000 },
  { month: "Feb", assets: 765000, liabilities: 520000, equity: 245000 },
  { month: "Mar", assets: 780000, liabilities: 525000, equity: 255000 },
  { month: "Apr", assets: 795000, liabilities: 530000, equity: 265000 },
  { month: "May", assets: 810000, liabilities: 535000, equity: 275000 },
  { month: "Jun", assets: 830000, liabilities: 540000, equity: 290000 },
];

export default function BalanceSheet() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [comparison, setComparison] = useState("previous-period");
  
  // Calculate totals
  const totalAssets = balanceSheetData.assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = balanceSheetData.liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.amount, 0);
  const liabilitiesAndEquity = totalLiabilities + totalEquity;

  // Calculate current assets and liabilities
  const currentAssets = balanceSheetData.assets
    .filter(item => item.category === "Current Assets")
    .reduce((sum, item) => sum + item.amount, 0);
  
  const currentLiabilities = balanceSheetData.liabilities
    .filter(item => item.category === "Current Liabilities")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ReportPageHeader 
          title="Balance Sheet"
          description="View your company's financial position"
        />

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
        />

        <FinancialReportsNav currentReport="balance-sheet" />

        {/* Balance Sheet Content */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Balance Sheet Table */}
          <div className="lg:col-span-4">
            <BalanceSheetHeader 
              period={period}
              setPeriod={setPeriod}
              comparison={comparison}
              setComparison={setComparison}
            />
            <div className="mt-4">
              <BalanceSheetTable 
                assets={balanceSheetData.assets}
                liabilities={balanceSheetData.liabilities}
                equity={balanceSheetData.equity}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          {/* Summary Cards and Chart */}
          <div className="lg:col-span-3 space-y-4">
            <BalanceSheetMetrics 
              totalAssets={totalAssets}
              totalLiabilities={totalLiabilities}
              totalEquity={totalEquity}
              liabilitiesAndEquity={liabilitiesAndEquity}
            />
            
            <BalanceSheetChart data={monthlyAssetData} />

            <FinancialRatios
              currentAssets={currentAssets}
              currentLiabilities={currentLiabilities}
              totalLiabilities={totalLiabilities}
              totalEquity={totalEquity}
              totalAssets={totalAssets}
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
