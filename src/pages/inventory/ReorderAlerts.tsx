
// This file is 246 lines long but we only modify the import and icon references for Alert

import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, ArrowUpRight, Filter, Plus, ShoppingCart, BadgeAlert, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock reorder alerts data
const mockReorderAlerts = [
  {
    id: "R001",
    product: "Premium Bag of Rice",
    sku: "RBAG5000",
    stock: 2,
    reorder_level: 10,
    suggested_qty: 20,
    last_restock: "2025-02-05",
    status: "Critical",
    stock_percentage: 20,
  },
  {
    id: "R002",
    product: "Cooking Oil - 5L",
    sku: "COIL5L",
    stock: 4,
    reorder_level: 6,
    suggested_qty: 10,
    last_restock: "2025-02-25",
    status: "Warning",
    stock_percentage: 66,
  },
  {
    id: "R003",
    product: "Spaghetti 500g",
    sku: "SPG500",
    stock: 6,
    reorder_level: 10,
    suggested_qty: 15, 
    last_restock: "2025-03-01",
    status: "Warning",
    stock_percentage: 60,
  },
  {
    id: "R004",
    product: "Peak Milk Powder 400g",
    sku: "PKMK400",
    stock: 3,
    reorder_level: 10,
    suggested_qty: 20,
    last_restock: "2025-02-15",
    status: "Critical",
    stock_percentage: 30,
  },
];

export default function ReorderAlerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  
  // Filter items based on search query and status
  const filteredItems = mockReorderAlerts.filter(item => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      selectedStatus === "All" || 
      item.status === selectedStatus;
      
    return matchesSearch && matchesStatus;
  });
  
  // Count by status
  const criticalCount = mockReorderAlerts.filter(item => item.status === "Critical").length;
  const warningCount = mockReorderAlerts.filter(item => item.status === "Warning").length;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Reorder Alerts</h1>
            <p className="text-muted-foreground">Items that need to be restocked soon</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Create Purchase Order
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <BadgeAlert className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Items</p>
                <p className="text-2xl font-bold">{criticalCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <BadgeAlert className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warning Items</p>
                <p className="text-2xl font-bold">{warningCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value to Restock</p>
                <p className="text-2xl font-bold">₦350,000</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>Items below their reorder points that require attention</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product or SKU..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={selectedStatus === "All" ? "default" : "outline"}
                  className="whitespace-nowrap"
                  onClick={() => setSelectedStatus("All")}
                >
                  All
                </Button>
                <Button 
                  variant={selectedStatus === "Critical" ? "destructive" : "outline"} 
                  className="whitespace-nowrap"
                  onClick={() => setSelectedStatus("Critical")}
                >
                  Critical
                </Button>
                <Button 
                  variant={selectedStatus === "Warning" ? "secondary" : "outline"} 
                  className="whitespace-nowrap"
                  onClick={() => setSelectedStatus("Warning")}
                >
                  Warning
                </Button>
              </div>
            </div>

            {/* Reorder Alerts Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Reorder Point</TableHead>
                    <TableHead>Suggested Order</TableHead>
                    <TableHead>Last Restock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id} className="group">
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Critical" ? "danger" : "warning"}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">{item.stock}</span>
                            <span className="text-muted-foreground">of {item.reorder_level}</span>
                          </div>
                          <Progress 
                            value={item.stock_percentage} 
                            className={`h-2 ${
                              item.status === "Critical" ? "bg-red-200" : "bg-amber-200"
                            }`}
                            indicatorClassName={
                              item.status === "Critical" ? "bg-red-500" : "bg-amber-500"
                            }
                          />
                        </div>
                      </TableCell>
                      <TableCell>{item.reorder_level}</TableCell>
                      <TableCell className="font-semibold">{item.suggested_qty}</TableCell>
                      <TableCell>{item.last_restock}</TableCell>
                      <TableCell>
                        <Button size="sm" className="flex items-center gap-1">
                          <Plus className="h-3 w-3" />
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredItems.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No alerts found</p>
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

