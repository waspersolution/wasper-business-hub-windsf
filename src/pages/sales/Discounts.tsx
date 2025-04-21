
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Plus, Percent, Tag, Calendar, Users, Box } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock discount rules data
const mockDiscounts = [
  {
    id: "D001",
    name: "Summer Sale 2025",
    type: "Seasonal",
    discount_type: "Percentage",
    discount_value: 15,
    start_date: "2025-06-01",
    end_date: "2025-08-31",
    status: "Scheduled",
    applies_to: "All Products",
    conditions: "None",
    min_order: 0,
    usage_count: 0
  },
  {
    id: "D002",
    name: "New Customer Welcome",
    type: "Customer",
    discount_type: "Percentage",
    discount_value: 10,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: "Active",
    applies_to: "First Order",
    conditions: "New Customers Only",
    min_order: 5000,
    usage_count: 43
  },
  {
    id: "D003",
    name: "Bulk Purchase Discount",
    type: "Volume",
    discount_type: "Percentage",
    discount_value: 12,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: "Active",
    applies_to: "Orders > ₦100,000",
    conditions: "Minimum Order Value",
    min_order: 100000,
    usage_count: 18
  },
  {
    id: "D004",
    name: "VIP Customer Special",
    type: "Customer",
    discount_type: "Percentage",
    discount_value: 20,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: "Active",
    applies_to: "VIP Customer Group",
    conditions: "Customer Group Based",
    min_order: 0,
    usage_count: 72
  },
  {
    id: "D005",
    name: "Easter Holiday Special",
    type: "Seasonal",
    discount_type: "Fixed Amount",
    discount_value: 5000,
    start_date: "2025-04-18",
    end_date: "2025-04-22",
    status: "Scheduled",
    applies_to: "Selected Products",
    conditions: "Easter Weekend Only",
    min_order: 15000,
    usage_count: 0
  },
  {
    id: "D006",
    name: "Rice Clearance Sale",
    type: "Product",
    discount_type: "Percentage",
    discount_value: 25,
    start_date: "2025-03-01",
    end_date: "2025-03-15",
    status: "Expired",
    applies_to: "Rice Products",
    conditions: "While Stocks Last",
    min_order: 0,
    usage_count: 87
  }
];

export default function DiscountRules() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter discounts based on search and filters
  const filteredDiscounts = mockDiscounts.filter(discount => {
    const matchesSearch = 
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.applies_to.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = 
      typeFilter === "All" || 
      discount.type === typeFilter;
      
    const matchesStatus = 
      statusFilter === "All" || 
      discount.status === statusFilter;
      
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Count active discounts
  const activeDiscounts = mockDiscounts.filter(d => d.status === "Active").length;
  const scheduledDiscounts = mockDiscounts.filter(d => d.status === "Scheduled").length;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Discount Rules</h1>
            <p className="text-muted-foreground">Create and manage automatic discounts for your products and customer groups</p>
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Discount
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Percent className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Discounts</p>
                <p className="text-2xl font-bold">{activeDiscounts}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{scheduledDiscounts}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-violet-100 p-3 rounded-full">
                <Tag className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Discount Rules</p>
                <p className="text-2xl font-bold">{mockDiscounts.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Discount Rules</CardTitle>
            <CardDescription>Manage all your automatic discount rules and special offers</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discounts..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant={typeFilter === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("All")}
                >
                  All Types
                </Button>
                <Button 
                  variant={typeFilter === "Seasonal" ? "secondary" : "outline"} 
                  size="sm"
                  onClick={() => setTypeFilter("Seasonal")}
                >
                  Seasonal
                </Button>
                <Button 
                  variant={typeFilter === "Customer" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("Customer")}
                >
                  Customer
                </Button>
                <Button 
                  variant={typeFilter === "Product" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("Product")}
                >
                  Product
                </Button>
                <Button 
                  variant={typeFilter === "Volume" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter("Volume")}
                >
                  Volume
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Button 
                variant={statusFilter === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("All")}
              >
                All Status
              </Button>
              <Button 
                variant={statusFilter === "Active" ? "success" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Active")}
              >
                Active
              </Button>
              <Button 
                variant={statusFilter === "Scheduled" ? "info" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Scheduled")}
              >
                Scheduled
              </Button>
              <Button 
                variant={statusFilter === "Expired" ? "outline" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Expired")}
              >
                Expired
              </Button>
            </div>

            {/* Discounts Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Applies To</TableHead>
                    <TableHead>Min. Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDiscounts.map((discount) => (
                    <TableRow key={discount.id} className="group">
                      <TableCell className="font-medium">{discount.id}</TableCell>
                      <TableCell className="font-medium">{discount.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{discount.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {discount.discount_type === "Percentage" 
                            ? `${discount.discount_value}%` 
                            : `₦${discount.discount_value.toLocaleString()}`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {discount.start_date} to {discount.end_date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[150px] truncate">
                          {discount.applies_to}
                        </div>
                      </TableCell>
                      <TableCell>
                        {discount.min_order > 0 
                          ? `₦${discount.min_order.toLocaleString()}` 
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            discount.status === "Active" ? "success" :
                            discount.status === "Scheduled" ? "info" : "warning"
                          }
                        >
                          {discount.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredDiscounts.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No discounts found</p>
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
