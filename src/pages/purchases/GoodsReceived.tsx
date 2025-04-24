
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Download, Box, CalendarDays, Store } from "lucide-react";
import { useState } from "react";

// Mock data for goods received notes
const mockReceipts = [
  {
    id: "GR001",
    supplier: "ABC Suppliers",
    order_id: "PO001",
    date_received: "2025-04-20",
    received_by: "Jane Smith",
    items: 12,
    status: "checked",
  },
  {
    id: "GR002",
    supplier: "XYZ Traders",
    order_id: "PO002",
    date_received: "2025-04-11",
    received_by: "John Doe",
    items: 8,
    status: "pending",
  },
  {
    id: "GR003",
    supplier: "Global Distributors",
    order_id: "PO005",
    date_received: "2025-04-15",
    received_by: "Sarah Jones",
    items: 15,
    status: "checked",
  },
  {
    id: "GR004",
    supplier: "Premium Vendors",
    order_id: "PO007",
    date_received: "2025-04-22",
    received_by: "Mike Brown",
    items: 5,
    status: "pending",
  },
];

export default function GoodsReceived() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter GRNs based on search term and status
  const filteredReceipts = mockReceipts.filter(grn => {
    const matchesSearch = grn.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         grn.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grn.order_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || grn.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Goods Received</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track incoming inventory from suppliers
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Receipt
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Goods Received Notes</CardTitle>
            <CardDescription>
              View and manage inventory receipts from suppliers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by GRN #, supplier or PO #..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="checked">Checked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
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
                    <TableHead>GRN ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date Received</TableHead>
                    <TableHead>Received By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReceipts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No receipts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReceipts.map((grn) => (
                      <TableRow key={grn.id}>
                        <TableCell className="font-medium">{grn.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Store className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {grn.supplier}
                          </div>
                        </TableCell>
                        <TableCell>{grn.order_id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Box className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {grn.items}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            {grn.date_received}
                          </div>
                        </TableCell>
                        <TableCell>{grn.received_by}</TableCell>
                        <TableCell>
                          <Badge variant={grn.status === "checked" ? "success" : "warning"}>
                            {grn.status.charAt(0).toUpperCase() + grn.status.slice(1)}
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
