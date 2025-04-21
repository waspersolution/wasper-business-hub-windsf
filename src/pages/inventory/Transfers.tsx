
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { 
  Search, 
  Filter, 
  Plus, 
  ArrowRight, 
  ArrowLeftRight,
  WarehouseIcon,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";

// Enhanced mock transfers data
const mockTransfers = [
  {
    id: "T001",
    products: [
      { name: "Premium Bag of Rice", qty: 10 }
    ],
    total_qty: 10,
    from: "Main Warehouse",
    to: "Apapa Branch",
    user: "Chidi Okafor",
    date: "2025-02-28",
    status: "Completed",
    tracking_id: "TRK8976543",
  },
  {
    id: "T002",
    products: [
      { name: "Cooking Oil - 5L", qty: 5 },
      { name: "Spaghetti 500g", qty: 20 }
    ],
    total_qty: 25,
    from: "Main Warehouse",
    to: "Ikeja Branch",
    user: "Adekunle George",
    date: "2025-03-03",
    status: "Pending",
    tracking_id: "TRK1234567",
  },
  {
    id: "T003",
    products: [
      { name: "Spaghetti 500g", qty: 20 },
      { name: "Premium Bag of Rice", qty: 5 }
    ],
    total_qty: 25,
    from: "Ikeja Branch",
    to: "Lekki Branch",
    user: "Bukola Adebimpe",
    date: "2025-03-08",
    status: "Completed",
    tracking_id: "TRK9876543",
  },
  {
    id: "T004",
    products: [
      { name: "Milo Tin 500g", qty: 12 },
      { name: "Golden Penny Flour", qty: 8 }
    ],
    total_qty: 20,
    from: "Lekki Branch",
    to: "Ikeja Branch",
    user: "Nneka Eze",
    date: "2025-03-10",
    status: "In Transit",
    tracking_id: "TRK5432198",
  },
  {
    id: "T005",
    products: [
      { name: "Peak Milk Powder 400g", qty: 15 }
    ],
    total_qty: 15,
    from: "Main Warehouse",
    to: "Apapa Branch",
    user: "Tunde Johnson",
    date: "2025-03-12",
    status: "Pending",
    tracking_id: "TRK8765432",
  },
];

export default function Transfers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter transfers based on search and status
  const filteredTransfers = mockTransfers.filter(transfer => {
    const matchesSearch = 
      transfer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.products.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesStatus = 
      statusFilter === "All" || 
      transfer.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });
  
  // Count by status
  const completedCount = mockTransfers.filter(t => t.status === "Completed").length;
  const pendingCount = mockTransfers.filter(t => t.status === "Pending").length;
  const inTransitCount = mockTransfers.filter(t => t.status === "In Transit").length;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Stock Transfers</h1>
            <p className="text-muted-foreground">Manage and track stock movements between locations</p>
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Transfer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <ArrowLeftRight className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Transit</p>
                <p className="text-2xl font-bold">{inTransitCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Stock Transfers</CardTitle>
            <CardDescription>Track and manage all stock movements between locations</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transfers..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={statusFilter === "All" ? "default" : "outline"}
                  className="whitespace-nowrap"
                  onClick={() => setStatusFilter("All")}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "Completed" ? "secondary" : "outline"} 
                  className="whitespace-nowrap"
                  onClick={() => setStatusFilter("Completed")}
                >
                  Completed
                </Button>
                <Button 
                  variant={statusFilter === "Pending" ? "secondary" : "outline"} 
                  className="whitespace-nowrap"
                  onClick={() => setStatusFilter("Pending")}
                >
                  Pending
                </Button>
                <Button 
                  variant={statusFilter === "In Transit" ? "secondary" : "outline"} 
                  className="whitespace-nowrap"
                  onClick={() => setStatusFilter("In Transit")}
                >
                  In Transit
                </Button>
              </div>
            </div>

            {/* Transfers Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransfers.map((transfer) => (
                    <TableRow key={transfer.id} className="group">
                      <TableCell className="font-medium">{transfer.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px]">
                          {transfer.products.map((product, idx) => (
                            <div key={idx} className="truncate">
                              {product.name} ({product.qty})
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{transfer.total_qty}</TableCell>
                      <TableCell>{transfer.from}</TableCell>
                      <TableCell>{transfer.to}</TableCell>
                      <TableCell>{transfer.user}</TableCell>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            transfer.status === "Completed" ? "success" :
                            transfer.status === "Pending" ? "warning" : "info"
                          }
                        >
                          {transfer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredTransfers.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No transfers found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
