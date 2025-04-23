import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Filter, Printer } from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { TrialBalanceTab } from "./components/TrialBalanceTab";
import { ProfitLossTab } from "./components/ProfitLossTab";
import { CashFlowTab } from "./components/CashFlowTab";

// Mock data imports
const trialBalanceData = [
  { account_code: "1000", account_name: "Cash in Hand", account_type: "Asset", debit: 25000, credit: 0, balance: 25000 },
  { account_code: "1010", account_name: "Bank Current Account", account_type: "Asset", debit: 165000, credit: 0, balance: 165000 },
  { account_code: "1020", account_name: "Accounts Receivable", account_type: "Asset", debit: 87500, credit: 0, balance: 87500 },
  { account_code: "2000", account_name: "Accounts Payable", account_type: "Liability", debit: 0, credit: 45000, balance: -45000 },
  { account_code: "2010", account_name: "Short-term Loans", account_type: "Liability", debit: 0, credit: 75000, balance: -75000 },
  { account_code: "3000", account_name: "Capital", account_type: "Equity", debit: 0, credit: 100000, balance: -100000 },
  { account_code: "3010", account_name: "Retained Earnings", account_type: "Equity", debit: 0, credit: 57500, balance: -57500 },
  { account_code: "4000", account_name: "Sales Revenue", account_type: "Income", debit: 0, credit: 320000, balance: -320000 },
  { account_code: "5000", account_name: "Cost of Goods Sold", account_type: "Expense", debit: 192000, credit: 0, balance: 192000 },
  { account_code: "5010", account_name: "Salaries Expense", account_type: "Expense", debit: 78000, credit: 0, balance: 78000 },
  { account_code: "5020", account_name: "Rent Expense", account_type: "Expense", debit: 25000, credit: 0, balance: 25000 },
  { account_code: "5030", account_name: "Utilities Expense", account_type: "Expense", debit: 15000, credit: 0, balance: 15000 },
  { account_code: "5040", account_name: "Office Supplies", account_type: "Expense", debit: 10000, credit: 0, balance: 10000 },
];

const profitLossData = [
  { category: "Revenue", item: "Sales Revenue", amount: 320000 },
  { category: "Revenue", item: "Service Revenue", amount: 85000 },
  { category: "Revenue", item: "Interest Income", amount: 2500 },
  { category: "Expenses", item: "Cost of Goods Sold", amount: -192000 },
  { category: "Expenses", item: "Salaries Expense", amount: -78000 },
  { category: "Expenses", item: "Rent Expense", amount: -25000 },
  { category: "Expenses", item: "Utilities Expense", amount: -15000 },
  { category: "Expenses", item: "Office Supplies", amount: -10000 },
  { category: "Expenses", item: "Depreciation", amount: -12500 },
  { category: "Expenses", item: "Marketing Expense", amount: -18000 },
  { category: "Expenses", item: "Insurance", amount: -8500 },
];

const cashFlowData = [
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

const monthlyProfitData = [
  { month: "Jan", revenue: 280000, expenses: 232000, profit: 48000 },
  { month: "Feb", revenue: 290000, expenses: 235000, profit: 55000 },
  { month: "Mar", revenue: 310000, expenses: 245000, profit: 65000 },
  { month: "Apr", revenue: 320000, expenses: 258000, profit: 62000 },
  { month: "May", revenue: 350000, expenses: 275000, profit: 75000 },
  { month: "Jun", revenue: 380000, expenses: 290000, profit: 90000 },
];

export default function FinancialReports() {
  const [activeTab, setActiveTab] = useState("trialBalance");
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("all");
  
  // Filter trial balance data based on search and account type
  const filteredTrialBalance = trialBalanceData.filter((item) => {
    const matchesSearch = 
      item.account_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.account_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = accountType === "all" || item.account_type.toLowerCase() === accountType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground mt-1">
              View and analyze your company's financial performance
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
          accountType={accountType}
          setAccountType={setAccountType}
        />

        <Card className="overflow-hidden">
          <Tabs defaultValue="trialBalance" onValueChange={setActiveTab} className="w-full">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Financial Statements</CardTitle>
                  <CardDescription>
                    View your company's detailed financial statements
                  </CardDescription>
                </div>
                <TabsList className="grid w-full sm:w-auto grid-cols-3 md:grid-cols-3">
                  <TabsTrigger value="trialBalance">Trial Balance</TabsTrigger>
                  <TabsTrigger value="profitLoss">Profit & Loss</TabsTrigger>
                  <TabsTrigger value="cashFlow">Cash Flow</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 pt-4">
              <TabsContent value="trialBalance" className="m-0">
                <TrialBalanceTab data={filteredTrialBalance} period={period} />
              </TabsContent>

              <TabsContent value="profitLoss" className="m-0">
                <ProfitLossTab 
                  data={profitLossData}
                  monthlyData={monthlyProfitData}
                  period={period}
                />
              </TabsContent>

              <TabsContent value="cashFlow" className="m-0">
                <CashFlowTab data={cashFlowData} period={period} />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">Save as Favorite</Button>
          <Button variant="outline">Schedule Report</Button>
          <Button>Generate Detailed Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
