
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BankAccount } from "@/types/bankAccounts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface AccountsListProps {
  accounts: BankAccount[];
  onViewAccount: (account: BankAccount) => void;
}

export function AccountsList({ accounts, onViewAccount }: AccountsListProps) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Bank & Cash Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Bank</TableHead>
                <TableHead className="hidden md:table-cell">Account Number</TableHead>
                <TableHead className="hidden lg:table-cell">Account Type</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="hidden lg:table-cell">Last Reconciled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onViewAccount(account)}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>{account.bank_name}</TableCell>
                    <TableCell className="hidden md:table-cell">{account.account_number}</TableCell>
                    <TableCell className="hidden lg:table-cell">{account.account_type}</TableCell>
                    <TableCell className="font-mono">
                      {account.currency === "NGN" ? "₦" : "$"}{account.balance.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {account.last_reconciled || "Never"}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewAccount(account);
                        }}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No accounts found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
