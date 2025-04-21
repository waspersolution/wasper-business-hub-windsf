
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Plus, Users, Percent, Tag, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock customer groups data
const mockCustomerGroups = [
  {
    id: "G001",
    name: "Wholesale Buyers",
    customers_count: 24,
    discount_rate: 10,
    min_order_value: 50000,
    created_at: "2025-01-15",
    status: "Active",
    description: "B2B customers with high-volume purchases",
  },
  {
    id: "G002",
    name: "Retail Customers",
    customers_count: 158,
    discount_rate: 0,
    min_order_value: 0,
    created_at: "2025-01-15",
    status: "Active",
    description: "Regular retail customers with no special pricing",
  },
  {
    id: "G003",
    name: "VIP Customers",
    customers_count: 12,
    discount_rate: 15,
    min_order_value: 25000,
    created_at: "2025-02-05",
    status: "Active",
    description: "Premium customers with special privileges and pricing",
  },
  {
    id: "G004",
    name: "Restaurant Partners",
    customers_count: 8,
    discount_rate: 12,
    min_order_value: 35000,
    created_at: "2025-02-18",
    status: "Active",
    description: "Restaurant businesses with bulk food supply needs",
  },
  {
    id: "G005",
    name: "Educational Institutions",
    customers_count: 5,
    discount_rate: 18,
    min_order_value: 75000,
    created_at: "2025-03-01",
    status: "Inactive",
    description: "Schools and educational institutions with periodic purchases",
  },
];

export default function CustomerGroups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter customer groups based on search and status
  const filteredGroups = mockCustomerGroups.filter(group => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "All" || 
      group.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });
  
  // Count statistics
  const totalGroups = mockCustomerGroups.length;
  const totalCustomers = mockCustomerGroups.reduce((sum, group) => sum + group.customers_count, 0);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Customer Groups</h1>
            <p className="text-muted-foreground">Manage customer segments for targeted pricing and discounts</p>
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Group
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Groups</p>
                <p className="text-2xl font-bold">{totalGroups}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-full">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Percent className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Highest Discount</p>
                <p className="text-2xl font-bold">18%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Customer Groups</CardTitle>
            <CardDescription>Segment customers for specialized pricing and marketing</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={statusFilter === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("All")}
                >
                  All Status
                </Button>
                <Button 
                  variant={statusFilter === "Active" ? "secondary" : "outline"} 
                  size="sm"
                  onClick={() => setStatusFilter("Active")}
                >
                  Active
                </Button>
                <Button 
                  variant={statusFilter === "Inactive" ? "outline" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("Inactive")}
                >
                  Inactive
                </Button>
              </div>
            </div>

            {/* Customer Groups Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Group Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Min. Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id} className="group">
                      <TableCell className="font-medium">{group.id}</TableCell>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate">{group.description}</div>
                      </TableCell>
                      <TableCell>{group.customers_count}</TableCell>
                      <TableCell>
                        <Badge variant={group.discount_rate > 0 ? "secondary" : "outline"}>
                          {group.discount_rate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {group.min_order_value > 0 ? `₦${group.min_order_value.toLocaleString()}` : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={group.status === "Active" ? "success" : "warning"}>
                          {group.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{group.created_at}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredGroups.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No groups found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
