
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/types/bankAccounts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ReconcileTabProps {
  account: {
    currency: string;
    balance: number;
    last_reconciled?: string;
  };
  transactions: Transaction[];
}

export function ReconcileTab({ account, transactions }: ReconcileTabProps) {
  const unreconciled = transactions.filter(t => !t.reconciled);
  
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Account Reconciliation</h3>
          <p className="text-sm text-muted-foreground">
            Last reconciled: {account.last_reconciled || "Never"}
          </p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reconcile Now
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reconciliation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="statement-balance" className="text-sm font-medium">Statement Balance</label>
              <Input id="statement-balance" placeholder="Enter bank statement balance" />
            </div>
            <div className="space-y-2">
              <label htmlFor="statement-date" className="text-sm font-medium">Statement Date</label>
              <Input id="statement-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Transactions to Reconcile</h4>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]"></TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unreconciled.length > 0 ? (
                    unreconciled.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="p-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell className={`text-right font-mono ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.amount < 0 ? '-' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No transactions to reconcile
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-sm text-muted-foreground mb-1">System Balance</div>
              <div className="text-lg font-semibold">
                {account.currency === "NGN" ? "₦" : "$"}{account.balance.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Difference</div>
              <div className="text-lg font-semibold text-amber-500">₦0.00</div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button size="sm">Complete Reconciliation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
