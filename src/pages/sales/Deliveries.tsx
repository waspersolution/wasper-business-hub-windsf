
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, PlusCircle, Download, Truck } from "lucide-react";
import { useState } from "react";

// Mock data for deliveries
const mockDeliveries = [
  {
    id: "DEL-2025-001",
    saleRef: "INV-2025-032",
    customer: "ABC Company",
    date: "2025-04-22",
    address: "123 Main St, City",
    status: "pending",
    carrier: "Express Delivery",
  },
  {
    id: "DEL-2025-002",
    saleRef: "INV-2025-028",
    customer: "XYZ Corporation",
    date: "2025-04-20",
    address: "456 Oak Ave, Town",
    status: "in_transit",
    carrier: "Fast Shipping Co",
  },
  {
    id: "DEL-2025-003",
    saleRef: "INV-2025-025",
    customer: "Global Enterprises",
    date: "2025-04-18",
    address: "789 Maple Rd, Village",
    status: "delivered",
    carrier: "Premium Logistics",
  },
  {
    id: "DEL-2025-004",
    saleRef: "INV-2025-021",
    customer: "Local Business Ltd",
    date: "2025-04-15",
    address: "101 Pine St, County",
    status: "scheduled",
    carrier: "City Couriers",
  },
];

export default function Deliveries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter deliveries based on search term and status
  const filteredDeliveries = mockDeliveries.filter(delivery => {
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.saleRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get status badge color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "in_transit": return "bg-purple-100 text-purple-800";
      case "delivered": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  // Format status for display
  const formatStatus = (status: string) => {
    if (status === "in_transit") return "In Transit";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deliveries</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage product deliveries to customers
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Delivery
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Deliveries List</CardTitle>
            <CardDescription>
              View and manage all your customer deliveries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by delivery #, invoice # or customer..."
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
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
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
                    <TableHead>Delivery #</TableHead>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Carrier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeliveries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No deliveries found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.saleRef}</TableCell>
                        <TableCell>{delivery.customer}</TableCell>
                        <TableCell>{delivery.date}</TableCell>
                        <TableCell>{delivery.address}</TableCell>
                        <TableCell>{delivery.carrier}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getStatusColor(delivery.status)}>
                            {formatStatus(delivery.status)}
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
