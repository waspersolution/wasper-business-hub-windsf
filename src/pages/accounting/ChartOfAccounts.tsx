
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
import { Layout } from "@/components/Layout/DashboardLayout";
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
  
  const getAccountTypeColor = (type: AccountType): string => {
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
    <Layout>
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
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-1/3">
                <Input
                  placeholder="Search by account name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
                />
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 ml-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Advanced Filters
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Account Subtypes</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subtype" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current-asset">Current Asset</SelectItem>
                            <SelectItem value="fixed-asset">Fixed Asset</SelectItem>
                            <SelectItem value="current-liability">Current Liability</SelectItem>
                            <SelectItem value="long-term-liability">Long-term Liability</SelectItem>
                            <SelectItem value="operating-expense">Operating Expense</SelectItem>
                            <SelectItem value="direct-cost">Direct Cost</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Balance Range</h4>
                        <div className="flex gap-2">
                          <Input type="number" className="w-full" placeholder="Min" />
                          <Input type="number" className="w-full" placeholder="Max" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Reset</Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {filteredAccounts.map((account) => (
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
          </CardContent>
        </Card>
      </div>
      
      {/* New Account Dialog */}
      <Dialog open={newAccountDialog} onOpenChange={setNewAccountDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Create a new account in your chart of accounts
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="account-code" className="text-sm font-medium">Account Code</label>
                <Input id="account-code" placeholder="e.g. 1000" />
              </div>
              <div className="space-y-2">
                <label htmlFor="account-name" className="text-sm font-medium">Account Name</label>
                <Input id="account-name" placeholder="e.g. Cash" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="account-type" className="text-sm font-medium">Account Type</label>
              <Select>
                <SelectTrigger id="account-type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asset">Asset</SelectItem>
                  <SelectItem value="liability">Liability</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="account-subtype" className="text-sm font-medium">Subtype</label>
              <Select>
                <SelectTrigger id="account-subtype">
                  <SelectValue placeholder="Select subtype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-asset">Current Asset</SelectItem>
                  <SelectItem value="fixed-asset">Fixed Asset</SelectItem>
                  <SelectItem value="current-liability">Current Liability</SelectItem>
                  <SelectItem value="long-term-liability">Long-term Liability</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="direct-cost">Direct Cost</SelectItem>
                  <SelectItem value="operating-expense">Operating Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input id="description" placeholder="Brief description of this account" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="parent-account" className="text-sm font-medium">Parent Account (Optional)</label>
              <Select>
                <SelectTrigger id="parent-account">
                  <SelectValue placeholder="Select parent account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None (Top Level)</SelectItem>
                  {mockAccounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.code} - {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="active" />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Active
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAccountDialog(false)}>
              Cancel
            </Button>
            <Button>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Account Dialog */}
      <Dialog open={editAccountDialog} onOpenChange={setEditAccountDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Modify the account details
            </DialogDescription>
          </DialogHeader>
          {selectedAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="edit-account-code" className="text-sm font-medium">Account Code</label>
                  <Input id="edit-account-code" defaultValue={selectedAccount.code} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-account-name" className="text-sm font-medium">Account Name</label>
                  <Input id="edit-account-name" defaultValue={selectedAccount.name} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-account-type" className="text-sm font-medium">Account Type</label>
                <Select defaultValue={selectedAccount.type}>
                  <SelectTrigger id="edit-account-type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-account-subtype" className="text-sm font-medium">Subtype</label>
                <Select defaultValue={selectedAccount.subtype.toLowerCase().replace(" ", "-")}>
                  <SelectTrigger id="edit-account-subtype">
                    <SelectValue placeholder="Select subtype" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-asset">Current Asset</SelectItem>
                    <SelectItem value="fixed-asset">Fixed Asset</SelectItem>
                    <SelectItem value="current-liability">Current Liability</SelectItem>
                    <SelectItem value="long-term-liability">Long-term Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="direct-cost">Direct Cost</SelectItem>
                    <SelectItem value="operating-expense">Operating Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
                <Input id="edit-description" defaultValue={selectedAccount.description} />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="edit-active" defaultChecked={selectedAccount.active} />
                <label
                  htmlFor="edit-active"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Active
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAccountDialog(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
