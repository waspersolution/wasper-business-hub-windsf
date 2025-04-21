
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/bankAccounts";
import { TransactionTable } from "./TransactionTable";

interface TransactionsTabProps {
  transactions: Transaction[];
}

export function TransactionsTab({ transactions }: TransactionsTabProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">View all account activity</p>
        </div>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Export Statement
        </Button>
      </div>

      <div className="rounded-md border">
        <TransactionTable
          transactions={transactions}
          emptyMessage="No transactions found for this account"
        />
      </div>
    </div>
  );
}
