
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Download, Calendar, Store, CreditCard } from "lucide-react";
import { useState } from "react";

// Mock data for purchase ledger
const mockPurchaseLedger = [
  {
    id: "PL001",
    supplier: "ABC Suppliers",
    type: "invoice",
    amount: 50000,
    paid: 25000,
    balance: 25000,
    date: "2025-04-01",
    status: "partial",
  },
  {
    id: "PL002",
    supplier: "XYZ Traders",
    type: "payment",
    amount: 47000,
    paid: 47000,
    balance: 0,
    date: "2025-04-11",
    status: "paid",
  },
  {
    id: "PL003",
    supplier: "Global Distributors",
    type: "invoice",
    amount: 32500,
    paid: 0,
    balance: 32500,
    date: "2025-04-15",
    status: "pending",
  },
  {
    id: "PL004",
    supplier: "Premium Vendors",
    type: "payment",
    amount: 18500,
    paid: 18500,
    balance: 0,
    date: "2025-04-05",
    status: "paid",
  },
];

export default function PurchasesLedger() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter ledger entries based on search term, type and status
  const filteredLedger = mockPurchaseLedger.filter(entry => {
    const matchesSearch = entry.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || entry.type === typeFilter;
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Get status badge color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case "paid": return "success";
      case "partial": return "warning";
      case "pending": return "secondary";
      default: return "default";
    }
  };
  
  // Get type badge color based on type
  const getTypeColor = (type: string) => {
    switch(type) {
      case "invoice": return "destructive";
      case "payment": return "success";
      default: return "default";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Ledger</h1>
            <p className="text-muted-foreground mt-1">
              Track supplier invoices and payments
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
            <Button variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Purchase Transactions</CardTitle>
            <CardDescription>
              View and manage all purchase invoices and payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or supplier..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[150px]">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[150px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="partial">Partially Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLedger.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLedger.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Store className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {entry.supplier}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeColor(entry.type)}>
                            {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>₦{entry.amount.toLocaleString()}</TableCell>
                        <TableCell>₦{entry.paid.toLocaleString()}</TableCell>
                        <TableCell>₦{entry.balance.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {entry.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(entry.status)}>
                            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
