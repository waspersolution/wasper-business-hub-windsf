
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { FinancialReportsNav } from "./components/FinancialReportsNav";
import { TrialBalanceMetrics } from "./components/TrialBalanceMetrics";
import { TrialBalanceTable } from "./components/tables/TrialBalanceTable";
import { TrialBalanceHeader } from "./components/TrialBalanceHeader";
import { useTrialBalance } from "./hooks/useTrialBalance";
import { trialBalanceData } from "./data/profitLossData";

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
  } = useTrialBalance(trialBalanceData);

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
          <TrialBalanceHeader period={period} />
          <CardContent>
            <TrialBalanceTable data={filteredData} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

