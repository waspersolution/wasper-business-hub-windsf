import { useState } from "react";
import { 
  Coins, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  ChevronDown,
  Edit,
  Trash2
} from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

type Account = {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  subtype: string;
  balance: number;
  active: boolean;
  parent_id?: string;
  description?: string;
  created_at: string;
  updated_at: string;
};

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
  {
    id: "A003",
    code: "1200",
    name: "Accounts Receivable",
    type: "asset",
    subtype: "Current Asset",
    balance: 450000,
    active: true,
    description: "Money owed by customers",
    created_at: "2025-01-01",
    updated_at: "2025-04-15"
  },
  {
    id: "L001",
    code: "2000",
    name: "Accounts Payable",
    type: "liability",
    subtype: "Current Liability",
    balance: 320000,
    active: true,
    description: "Money owed to suppliers",
    created_at: "2025-01-01",
    updated_at: "2025-04-18"
  },
  {
    id: "L002",
    code: "2100",
    name: "Loans Payable",
    type: "liability",
    subtype: "Long-term Liability",
    balance: 2000000,
    active: true,
    description: "Bank loan",
    created_at: "2025-01-01",
    updated_at: "2025-04-01"
  },
  {
    id: "E001",
    code: "3000",
    name: "Owner's Equity",
    type: "equity",
    subtype: "Equity",
    balance: 3000000,
    active: true,
    description: "Capital invested by owner",
    created_at: "2025-01-01",
    updated_at: "2025-01-01"
  },
  {
    id: "R001",
    code: "4000",
    name: "Sales Revenue",
    type: "revenue",
    subtype: "Revenue",
    balance: 1800000,
    active: true,
    description: "Income from sales",
    created_at: "2025-01-01",
    updated_at: "2025-04-21"
  },
  {
    id: "E001",
    code: "5000",
    name: "Cost of Goods Sold",
    type: "expense",
    subtype: "Direct Cost",
    balance: 980000,
    active: true,
    description: "Direct cost of products sold",
    created_at: "2025-01-01",
    updated_at: "2025-04-19"
  },
  {
    id: "E002",
    code: "6000",
    name: "Rent Expense",
    type: "expense",
    subtype: "Operating Expense",
    balance: 150000,
    active: true,
    description: "Monthly rent",
    created_at: "2025-01-01",
    updated_at: "2025-04-05"
  },
  {
    id: "E003",
    code: "6100",
    name: "Utilities Expense",
    type: "expense",
    subtype: "Operating Expense",
    balance: 75000,
    active: true,
    description: "Electricity, water, internet",
    created_at: "2025-01-01",
    updated_at: "2025-04-10"
  }
];

import { ChartAccountsFilters } from "./components/ChartAccountsFilters";
import { ChartAccountsTable } from "./components/ChartAccountsTable";
import { NewAccountDialog } from "./components/NewAccountDialog";
import { EditAccountDialog } from "./components/EditAccountDialog";

export default function ChartOfAccounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [editAccountDialog, setEditAccountDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  
  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "" || account.type === typeFilter;
    const matchesStatus = statusFilter === "" || 
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
