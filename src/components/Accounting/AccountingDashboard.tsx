
import { Card } from "@/components/ui/card";
import { BankAccountSummary } from "@/components/bank-accounts/BankAccountSummary";
import { AccountingMetrics } from "./AccountingMetrics";
import { RecentTransactions } from "./RecentTransactions";
import { AccountingCharts } from "./AccountingCharts";

const mockBankAccounts = [
  { id: 1, name: "Main Account", balance: 125000, currency: "NGN" },
  { id: 2, name: "Petty Cash", balance: 15000, currency: "NGN" },
  { id: 3, name: "USD Account", balance: 5000, currency: "USD" },
];

export function AccountingDashboard() {
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
