
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Account } from "../ChartOfAccounts";

interface ChartAccountsTableProps {
  accounts: Account[];
  handleEditAccount: (account: Account) => void;
  getAccountTypeColor: (type: string) => "success" | "danger" | "info" | "warning" | "outline" | "default" | "destructive" | "secondary";
}

export function ChartAccountsTable({
  accounts,
  handleEditAccount,
  getAccountTypeColor
}: ChartAccountsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Subtype</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="font-medium">{account.code}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>
                <Badge variant={getAccountTypeColor(account.type)}>
                  {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{account.subtype}</TableCell>
              <TableCell className="text-right font-mono">
                ₦{account.balance.toLocaleString()}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge variant={account.active ? "success" : "outline"}>
                  {account.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Button
                  onClick={() => handleEditAccount(account)}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
