
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChartAccountsHeaderProps {
  onNewAccount: () => void;
}

export function ChartAccountsHeader({ onNewAccount }: ChartAccountsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Chart of Accounts</h1>
        <p className="text-muted-foreground">Manage your financial accounts structure</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={onNewAccount}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Account
        </Button>
      </div>
    </div>
  );
}
