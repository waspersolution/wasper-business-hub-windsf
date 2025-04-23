
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Filter, ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock data for reconciliations
const mockReconciliation = [
  {
    id: "RC001",
    account: "Bank - GTB",
    account_number: "0123456789",
    period: "2025-04",
    opening_balance: 500000,
    closing_balance: 535000,
    date: "2025-04-19",
    status: "matched",
    difference: 0,
    last_reconciled: "2025-03-15",
  },
  {
    id: "RC002",
    account: "Bank - Access",
    account_number: "9876543210",
    period: "2025-04",
    opening_balance: 95000,
    closing_balance: 85500,
    date: "2025-04-19",
    status: "unmatched",
    difference: 2500,
    last_reconciled: "2025-03-10",
  },
  {
    id: "RC003",
    account: "PayPal",
    account_number: "business@example.com",
    period: "2025-04",
    opening_balance: 12000,
    closing_balance: 15750,
    date: "2025-04-20",
    status: "in_progress",
    difference: null,
    last_reconciled: "2025-03-05",
  },
];

// Mock data for unreconciled transactions
const unreconciledTransactions = [
  { id: "T001", date: "2025-04-15", description: "Customer Payment - XYZ Corp", reference: "INV-2025-042", amount: 4500 },
  { id: "T002", date: "2025-04-16", description: "Supplier Payment - Office Supplies", reference: "PO-2025-119", amount: -1200 },
  { id: "T003", date: "2025-04-17", description: "Bank Charges", reference: "FEE-042", amount: -45 },
  { id: "T004", date: "2025-04-18", description: "Customer Payment - ABC Ltd", reference: "INV-2025-044", amount: 3200 },
  { id: "T005", date: "2025-04-19", description: "Utility Bill Payment", reference: "UTIL-042", amount: -850 },
];

export default function Reconciliation() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("2025-04");
  const [selectedAccount, setSelectedAccount] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter reconciliations based on search and status filter
  const filteredReconciliations = mockReconciliation.filter((rec) => {
    const matchesSearch = 
      rec.account.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rec.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle opening the reconciliation dialog
  const handleReconcileAccount = (account: any) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "matched":
        return <Badge variant="success">Matched</Badge>;
      case "unmatched":
        return <Badge variant="destructive">Unmatched</Badge>;
      case "in_progress":
        return <Badge variant="warning">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Account Reconciliation</h1>
            <p className="text-muted-foreground mt-1">
              Reconcile your bank accounts and track financial discrepancies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Reconciliation
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts or reconciliations..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <label className="text-sm font-medium mb-1 block">Period</label>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-04">April 2025</SelectItem>
                    <SelectItem value="2025-03">March 2025</SelectItem>
                    <SelectItem value="2025-02">February 2025</SelectItem>
                    <SelectItem value="2025-01">January 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-48">
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="matched">Matched</SelectItem>
                    <SelectItem value="unmatched">Unmatched</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reconciliation Table */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Reconciliation History</CardTitle>
            <CardDescription>
              View and manage your account reconciliations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Opening Balance</TableHead>
                  <TableHead>Closing Balance</TableHead>
                  <TableHead>Difference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReconciliations.length > 0 ? (
                  filteredReconciliations.map((rec) => (
                    <TableRow key={rec.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{rec.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rec.account}</div>
                          <div className="text-xs text-muted-foreground">{rec.account_number}</div>
                        </div>
                      </TableCell>
                      <TableCell>{rec.period}</TableCell>
                      <TableCell>₦{rec.opening_balance.toLocaleString()}</TableCell>
                      <TableCell>₦{rec.closing_balance.toLocaleString()}</TableCell>
                      <TableCell>
                        {rec.difference !== null ? (
                          <span className={rec.difference === 0 ? "text-green-600" : "text-red-600"}>
                            {rec.difference === 0 ? "Balanced" : `₦${rec.difference.toLocaleString()}`}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(rec.status)}</TableCell>
                      <TableCell>{rec.date}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReconcileAccount(rec)}
                        >
                          {rec.status === "in_progress" ? "Continue" : "View"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No reconciliations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Reconcile Account: {selectedAccount?.account}
            </DialogTitle>
            <DialogDescription>
              Last reconciled: {selectedAccount?.last_reconciled || "Never"}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="transactions">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="statement">Statement</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Unreconciled Transactions</h3>
                <Button size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unreconciledTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-muted/30">
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
            </TabsContent>
            
            <TabsContent value="statement" className="space-y-4">
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
                <label htmlFor="statement-upload" className="text-sm font-medium">Upload Statement (Optional)</label>
                <Input id="statement-upload" type="file" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <Button variant="outline">Auto-Match Transactions</Button>
                <Button>Save Statement Details</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">System Balance</div>
                  <div className="text-lg font-semibold">
                    ₦{selectedAccount?.closing_balance.toLocaleString() || "0.00"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Statement Balance</div>
                  <div className="text-lg font-semibold">₦0.00</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Difference</div>
                <div className="text-lg font-semibold text-amber-500">
                  ₦{selectedAccount?.difference !== null ? selectedAccount.difference.toLocaleString() : "0.00"}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Reconciliation Notes</h4>
                <textarea 
                  className="w-full rounded-md border border-input bg-background p-2 text-sm" 
                  rows={3}
                  placeholder="Enter any notes about this reconciliation..."
                ></textarea>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {selectedAccount?.status === "unmatched" 
                ? "There are unmatched transactions that need to be reconciled" 
                : "Ready to complete reconciliation"}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button>Complete Reconciliation</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
