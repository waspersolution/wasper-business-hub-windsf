
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Transaction } from "@/types/bankAccounts";

interface TransactionTableProps {
  transactions: Transaction[];
  emptyMessage?: string;
}

export function TransactionTable({ transactions, emptyMessage = "No transactions found" }: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.reference}</TableCell>
              <TableCell className={`text-right font-mono ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.amount < 0 ? '-' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant={transaction.reconciled ? "success" : "outline"}>
                  {transaction.reconciled ? "Reconciled" : "Pending"}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
