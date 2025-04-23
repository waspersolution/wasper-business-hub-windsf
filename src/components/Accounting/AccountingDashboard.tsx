
import { Card } from "@/components/ui/card";
import { BankAccountSummary } from "@/components/bank-accounts/BankAccountSummary";
import { AccountingMetrics } from "./AccountingMetrics";
import { RecentTransactions } from "./RecentTransactions";
import { AccountingCharts } from "./AccountingCharts";
import { BankAccount } from "@/types/bankAccounts";
import { mockBankAccounts } from "@/data/mockBankAccounts";

export function AccountingDashboard() {
  // Use the proper mockBankAccounts from the data file that matches the BankAccount type
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Accounting Dashboard</h1>
      
      <BankAccountSummary accounts={mockBankAccounts} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <AccountingMetrics />
        <AccountingCharts />
      </div>
      
      <RecentTransactions />
    </div>
  );
}
