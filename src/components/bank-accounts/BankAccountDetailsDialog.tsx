
import { CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankAccount } from "@/types/bankAccounts";
import { mockTransactions, chartData } from "@/data/mockBankAccounts";
import { TransactionsTab } from "./TransactionsTab";
import { AnalyticsTab } from "./AnalyticsTab";
import { ReconcileTab } from "./ReconcileTab";

interface BankAccountDetailsDialogProps {
  account: BankAccount | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BankAccountDetailsDialog({ 
  account, 
  open, 
  onOpenChange 
}: BankAccountDetailsDialogProps) {
  if (!account) return null;
  
  const transactions = mockTransactions[account.id] || [];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <CreditCard size={20} />
            {account.name} - {account.bank_name}
          </DialogTitle>
          <DialogDescription>
            Account #{account.account_number} ({account.account_type})
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="transactions">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reconcile">Reconcile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <TransactionsTab transactions={transactions} />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsTab account={account} transactions={transactions} chartData={chartData} />
          </TabsContent>
          
          <TabsContent value="reconcile">
            <ReconcileTab account={account} transactions={transactions} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
