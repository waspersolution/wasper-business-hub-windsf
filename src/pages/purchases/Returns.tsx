
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Download } from "lucide-react";
import { useState } from "react";

// Mock data for purchase returns
const mockReturns = [
  {
    id: "PR-2025-001",
    supplier: "ABC Distributors",
    orderRef: "PO-2025-032",
    date: "2025-04-22",
    total: 1250.00,
    status: "pending",
    items: 5,
  },
  {
    id: "PR-2025-002",
    supplier: "Global Supplies Inc.",
    orderRef: "PO-2025-028",
    date: "2025-04-20",
    total: 780.50,
    status: "approved",
    items: 3,
  },
  {
    id: "PR-2025-003",
    supplier: "Tech Components Ltd",
    orderRef: "PO-2025-025",
    date: "2025-04-18",
    total: 2100.75,
    status: "completed",
    items: 7,
  },
  {
    id: "PR-2025-004",
    supplier: "Office Solutions Co.",
    orderRef: "PO-2025-021",
    date: "2025-04-15",
    total: 450.25,
    status: "rejected",
    items: 2,
  },
];

export default function Returns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter returns based on search term and status
  const filteredReturns = mockReturns.filter(returnItem => {
    const matchesSearch = returnItem.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         returnItem.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.orderRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || returnItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get status badge color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Purchase Returns</h1>
            <p className="text-muted-foreground mt-1">
              Process and manage returns to suppliers
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Return
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Returns List</CardTitle>
            <CardDescription>
              View and manage all your returns to suppliers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by return #, order # or supplier..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Return #</TableHead>
                    <TableHead>Order #</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReturns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No returns found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReturns.map((returnItem) => (
                      <TableRow key={returnItem.id}>
                        <TableCell className="font-medium">{returnItem.id}</TableCell>
                        <TableCell>{returnItem.orderRef}</TableCell>
                        <TableCell>{returnItem.supplier}</TableCell>
                        <TableCell>{returnItem.date}</TableCell>
                        <TableCell>{returnItem.items}</TableCell>
                        <TableCell>${returnItem.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(returnItem.status)}>
                            {returnItem.status.charAt(0).toUpperCase() + returnItem.status.slice(1)}
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
