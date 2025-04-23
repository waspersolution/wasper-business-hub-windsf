
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { TrialBalanceTable } from "./components/tables/TrialBalanceTable";
import { useTrialBalanceCalculations } from "./hooks/useTrialBalanceCalculations";
import type { TrialBalanceItem } from "./types/financial-reports";
import { Download, Filter, Printer } from "lucide-react";

// Mock data for trial balance
const trialBalanceData: TrialBalanceItem[] = [
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

export default function TrialBalance() {
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

  // Calculate totals using the hook
  const { totals } = useTrialBalanceCalculations(filteredTrialBalance);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ReportPageHeader 
          title="Trial Balance"
          description="Summary of all your general ledger accounts"
        />

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
          accountType={accountType}
          setAccountType={setAccountType}
        />

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Trial Balance</CardTitle>
            <CardDescription>
              For the period ending {period === "2025-04" ? "April 30, 2025" : period}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <TrialBalanceTable data={filteredTrialBalance} />
          </CardContent>
        </Card>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Debits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">₦{totals.debit.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">₦{totals.credit.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${Math.abs(totals.debit - totals.credit) < 0.01 ? "text-green-600" : "text-red-600"}`}>
                {Math.abs(totals.debit - totals.credit) < 0.01 ? "Balanced ✓" : `₦${Math.abs(totals.debit - totals.credit).toLocaleString()} ✗`}
              </p>
            </CardContent>
          </Card>
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
