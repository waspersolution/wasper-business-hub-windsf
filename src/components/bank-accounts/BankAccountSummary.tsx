
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2, Wallet } from "lucide-react";
import { BankAccount } from "@/types/bankAccounts";

interface BankAccountSummaryProps {
  accounts: BankAccount[];
}

export function BankAccountSummary({ accounts }: BankAccountSummaryProps) {
  const totalBalance = accounts
    .filter(a => a.currency === "NGN")
    .reduce((sum, account) => sum + account.balance, 0);
  
  const totalUsdBalance = accounts
    .filter(a => a.currency === "USD")
    .reduce((sum, account) => sum + account.balance, 0);
    
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Balance (NGN)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₦{totalBalance.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">
            Combined balance across {accounts.filter(a => a.currency === "NGN").length} accounts
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">USD Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${totalUsdBalance.toLocaleString()}</div>
          <p className="text-sm text-muted-foreground">
            Combined balance across {accounts.filter(a => a.currency === "USD").length} accounts
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Wallet className="mr-2 h-4 w-4" />
            Transfer Between Accounts
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <BarChart2 className="mr-2 h-4 w-4" />
            View Cash Flow Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
