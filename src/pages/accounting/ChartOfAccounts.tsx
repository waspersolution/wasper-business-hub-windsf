
import { useState } from "react";
import { 
  Coins, 
  Plus, 
  Download, 
  Search, 
  Filter 
} from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Account, AccountType } from "@/types/accounting";
import { ChartAccountsTable } from "./components/ChartAccountsTable";
import { ChartAccountsFilters } from "./components/ChartAccountsFilters";
import { NewAccountDialog } from "./components/NewAccountDialog";
import { EditAccountDialog } from "./components/EditAccountDialog";

const mockAccounts: Account[] = [
  {
    id: "A001",
    code: "1000",
    name: "Cash",
    type: "asset",
    subtype: "Current Asset",
    balance: 850000,
    active: true,
    description: "Cash on hand",
    created_at: "2025-01-01",
    updated_at: "2025-04-10"
  },
  {
    id: "A002",
    code: "1010",
    name: "Bank Account",
    type: "asset",
    subtype: "Current Asset",
    balance: 1250000,
    active: true,
    description: "Primary bank account",
    created_at: "2025-01-01",
    updated_at: "2025-04-20"
  },
  // ... more mock accounts
];

export default function ChartOfAccounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [editAccountDialog, setEditAccountDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  
  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || account.type === typeFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && account.active) || 
      (statusFilter === "inactive" && !account.active);
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleEditAccount = (account: Account) => {
    setSelectedAccount(account);
    setEditAccountDialog(true);
  };
  
  const getAccountTypeColor = (type: AccountType): "success" | "danger" | "info" | "warning" | "outline" => {
    switch (type) {
      case "asset": return "success";
      case "liability": return "danger";
      case "equity": return "info";
      case "revenue": return "success";
      case "expense": return "warning";
      default: return "outline";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
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
            <Button onClick={() => setNewAccountDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Account
            </Button>
          </div>
        </div>
        <ChartAccountsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ChartAccountsTable
          accounts={filteredAccounts}
          handleEditAccount={handleEditAccount}
          getAccountTypeColor={getAccountTypeColor}
        />
      </div>
      <NewAccountDialog
        open={newAccountDialog}
        setOpen={setNewAccountDialog}
        mockAccounts={mockAccounts}
      />
      <EditAccountDialog
        open={editAccountDialog}
        setOpen={setEditAccountDialog}
        selectedAccount={selectedAccount}
      />
    </DashboardLayout>
  );
}
