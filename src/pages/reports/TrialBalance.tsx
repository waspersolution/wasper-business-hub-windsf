
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { FinancialReportsNav } from "./components/FinancialReportsNav";
import { useTrialBalanceReporting } from "./hooks/useTrialBalanceReporting";
import { TrialBalanceMetrics } from "./components/TrialBalanceMetrics";
import { TrialBalanceTable } from "./components/tables/TrialBalanceTable";
import { trialBalanceData } from "./data/profitLossData";
import { FileText, Printer } from 'lucide-react';

export default function TrialBalance() {
  const {
    period,
    setPeriod,
    searchTerm,
    setSearchTerm,
    accountType,
    setAccountType,
    filteredData,
    totals,
    isBalanced
  } = useTrialBalanceReporting(trialBalanceData);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ReportPageHeader 
          title="Trial Balance"
          description="View account balances and verify debits equal credits"
        />

        <FinancialReportFilters
          period={period}
          setPeriod={setPeriod}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          accountType={accountType}
          setAccountType={setAccountType}
        />

        <FinancialReportsNav currentReport="trial-balance" />

        <TrialBalanceMetrics 
          totalDebit={totals.debit}
          totalCredit={totals.credit}
          isBalanced={isBalanced}
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Trial Balance</CardTitle>
                <CardDescription>
                  For the period ending {period === "2025-04" ? "April 30, 2025" : period}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {}}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" onClick={() => {}}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TrialBalanceTable data={filteredData} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
