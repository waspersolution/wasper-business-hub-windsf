
import { useState } from "react";
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  Edit,
  Trash2,
  Eye,
  Download,
  Wallet,
  BarChart2,
  RefreshCw,
  FileText,
  ChevronDown
} from "lucide-react";
import { Layout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type BankAccount = {
  id: string;
  name: string;
  account_number: string;
  bank_name: string;
  account_type: string;
  currency: string;
  balance: number;
  last_reconciled?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type Transaction = {
  id: string;
  account_id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer";
  category?: string;
  reconciled: boolean;
  created_at: string;
};

const mockBankAccounts: BankAccount[] = [
  {
    id: "BA001",
    name: "Main Operating Account",
    account_number: "0123456789",
    bank_name: "First Bank",
    account_type: "Current",
    currency: "NGN",
    balance: 2450000,
    last_reconciled: "2025-04-15",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-04-21"
  },
  {
    id: "BA002",
    name: "Payroll Account",
    account_number: "9876543210",
    bank_name: "Access Bank",
    account_type: "Current",
    currency: "NGN",
    balance: 875000,
    last_reconciled: "2025-04-10",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-04-18"
  },
  {
    id: "BA003",
    name: "Savings Account",
    account_number: "5432109876",
    bank_name: "Zenith Bank",
    account_type: "Savings",
    currency: "NGN",
    balance: 1500000,
    last_reconciled: "2025-03-31",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-04-01"
  },
  {
    id: "BA004",
    name: "USD Account",
    account_number: "0987654321",
    bank_name: "GTBank",
    account_type: "Domiciliary",
    currency: "USD",
    balance: 10000,
    is_active: true,
    created_at: "2025-02-15",
    updated_at: "2025-04-20"
  },
  {
    id: "BA005",
    name: "Tax Reserve Account",
    account_number: "1357924680",
    bank_name: "UBA",
    account_type: "Current",
    currency: "NGN",
    balance: 350000,
    last_reconciled: "2025-03-15",
    is_active: true,
    created_at: "2025-01-01",
    updated_at: "2025-03-15"
  }
];

const mockTransactions: Record<string, Transaction[]> = {
  "BA001": [
    {
      id: "T001",
      account_id: "BA001",
      date: "2025-04-21",
      description: "Sales deposit",
      reference: "DEP-001",
      amount: 250000,
      type: "deposit",
      category: "Sales",
      reconciled: true,
      created_at: "2025-04-21"
    },
    {
      id: "T002",
      account_id: "BA001",
      date: "2025-04-20",
      description: "Rent payment",
      reference: "CHQ-123",
      amount: -150000,
      type: "withdrawal",
      category: "Rent",
      reconciled: true,
      created_at: "2025-04-20"
    },
    {
      id: "T003",
      account_id: "BA001",
      date: "2025-04-18",
      description: "Supplier payment - ABC Suppliers",
      reference: "TRF-456",
      amount: -75000,
      type: "withdrawal",
      category: "Supplier Payment",
      reconciled: true,
      created_at: "2025-04-18"
    },
    {
      id: "T004",
      account_id: "BA001",
      date: "2025-04-15",
      description: "Customer payment - Acme Corp",
      reference: "DEP-002",
      amount: 125000,
      type: "deposit",
      category: "Customer Payment",
      reconciled: true,
      created_at: "2025-04-15"
    },
    {
      id: "T005",
      account_id: "BA001",
      date: "2025-04-12",
      description: "Utility bills",
      reference: "AUTO-789",
      amount: -45000,
      type: "withdrawal",
      category: "Utilities",
      reconciled: false,
      created_at: "2025-04-12"
    }
  ],
  "BA002": [
    {
      id: "T006",
      account_id: "BA002",
      date: "2025-04-21",
      description: "Transfer from main account",
      reference: "TRF-789",
      amount: 350000,
      type: "deposit",
      category: "Transfer",
      reconciled: true,
      created_at: "2025-04-21"
    },
    {
      id: "T007",
      account_id: "BA002",
      date: "2025-04-20",
      description: "Payroll - April 2025",
      reference: "PAY-APR25",
      amount: -325000,
      type: "withdrawal",
      category: "Payroll",
      reconciled: true,
      created_at: "2025-04-20"
    }
  ]
};

const chartData = [
  { name: 'Jan', balance: 1500000 },
  { name: 'Feb', balance: 1750000 },
  { name: 'Mar', balance: 2200000 },
  { name: 'Apr', balance: 2450000 },
];

const BankAccountDetailsDialog = ({ account, open, onOpenChange }) => {
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
          
          <TabsContent value="transactions" className="space-y-4 pt-4">
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
                        No transactions found for this account
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {account.currency === "NGN" ? "₦" : "$"}{account.balance.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Monthly Inflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {account.currency === "NGN" ? "₦" : "$"}
                    {transactions
                      .filter(t => t.amount > 0 && new Date(t.date).getMonth() === new Date().getMonth())
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Monthly Outflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {account.currency === "NGN" ? "₦" : "$"}
                    {Math.abs(transactions
                      .filter(t => t.amount < 0 && new Date(t.date).getMonth() === new Date().getMonth())
                      .reduce((sum, t) => sum + t.amount, 0))
                      .toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Balance Trend</CardTitle>
                <CardDescription>Account balance over the past months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`₦${value.toLocaleString()}`, 'Balance']}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reconcile" className="space-y-4 pt-4">
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
                        {transactions
                          .filter(t => !t.reconciled)
                          .map((transaction) => (
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
                        ))}
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default function BankAccounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newAccountDialog, setNewAccountDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [viewAccountDialog, setViewAccountDialog] = useState(false);
  
  const filteredAccounts = mockBankAccounts.filter(account => {
    const matchesSearch = 
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.account_number.includes(searchTerm) ||
      account.bank_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });
  
  const totalBalance = mockBankAccounts
    .filter(a => a.currency === "NGN")
    .reduce((sum, account) => sum + account.balance, 0);
  
  const totalUsdBalance = mockBankAccounts
    .filter(a => a.currency === "USD")
    .reduce((sum, account) => sum + account.balance, 0);
    
  const handleViewAccount = (account: BankAccount) => {
    setSelectedAccount(account);
    setViewAccountDialog(true);
  };
  
  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Bank Accounts</h1>
            <p className="text-muted-foreground">Manage all your bank and cash accounts</p>
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
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Balance (NGN)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₦{totalBalance.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">
                Combined balance across {mockBankAccounts.filter(a => a.currency === "NGN").length} accounts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">USD Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalUsdBalance.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">
                Combined balance across {mockBankAccounts.filter(a => a.currency === "USD").length} accounts
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Wallet className="mr-2 h-4 w-4" />
                Transfer Between Accounts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Cash Flow Report
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Search & Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-1/3">
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
                />
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Account Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="domiciliary">Domiciliary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 ml-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      More Filters
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Banks</h4>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <input id="filter-all-banks" type="checkbox" className="mr-2" defaultChecked />
                            <label htmlFor="filter-all-banks">All Banks</label>
                          </div>
                          <div className="flex items-center">
                            <input id="filter-first-bank" type="checkbox" className="mr-2" />
                            <label htmlFor="filter-first-bank">First Bank</label>
                          </div>
                          <div className="flex items-center">
                            <input id="filter-access" type="checkbox" className="mr-2" />
                            <label htmlFor="filter-access">Access Bank</label>
                          </div>
                          <div className="flex items-center">
                            <input id="filter-zenith" type="checkbox" className="mr-2" />
                            <label htmlFor="filter-zenith">Zenith Bank</label>
                          </div>
                          <div className="flex items-center">
                            <input id="filter-gtbank" type="checkbox" className="mr-2" />
                            <label htmlFor="filter-gtbank">GTBank</label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Currency</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Currencies</SelectItem>
                            <SelectItem value="ngn">NGN</SelectItem>
                            <SelectItem value="usd">USD</SelectItem>
                            <SelectItem value="eur">EUR</SelectItem>
                            <SelectItem value="gbp">GBP</SelectItem>
                          </SelectContent>
                        </Select>
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
                  {filteredAccounts.map((account) => (
                    <TableRow key={account.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewAccount(account)}>
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
                            handleViewAccount(account);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
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
      
      <BankAccountDetailsDialog
        account={selectedAccount}
        open={viewAccountDialog}
        onOpenChange={setViewAccountDialog}
      />
      
      <Dialog open={newAccountDialog} onOpenChange={setNewAccountDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Create a new bank or cash account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="account-name" className="text-sm font-medium">Account Name</label>
                <Input id="account-name" placeholder="e.g. Main Operating Account" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="account-type" className="text-sm font-medium">Account Type</label>
                <Select>
                  <SelectTrigger id="account-type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank">Bank Account</SelectItem>
                    <SelectItem value="cash">Cash Account</SelectItem>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="bank-name" className="text-sm font-medium">Bank Name</label>
                  <Input id="bank-name" placeholder="e.g. First Bank" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="account-number" className="text-sm font-medium">Account Number</label>
                  <Input id="account-number" placeholder="e.g. 0123456789" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="bank-account-type" className="text-sm font-medium">Bank Account Type</label>
                  <Select>
                    <SelectTrigger id="bank-account-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="domiciliary">Domiciliary</SelectItem>
                      <SelectItem value="fixed">Fixed Deposit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                  <Select defaultValue="ngn">
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngn">Nigerian Naira (NGN)</SelectItem>
                      <SelectItem value="usd">US Dollar (USD)</SelectItem>
                      <SelectItem value="eur">Euro (EUR)</SelectItem>
                      <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="opening-balance" className="text-sm font-medium">Opening Balance</label>
                <Input
                  id="opening-balance"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  suffix={<div className="text-muted-foreground">NGN</div>}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="balance-date" className="text-sm font-medium">Balance Date</label>
                <Input id="balance-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
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
    </Layout>
  );
}
