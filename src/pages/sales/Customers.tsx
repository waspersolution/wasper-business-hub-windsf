
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  UserPlus, 
  Users, 
  UserRound, 
  Mail as MailIcon, 
  Phone, 
  Calendar, 
  Filter,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

const mockCustomers = [
  {
    id: "C001",
    name: "Acme Corp",
    email: "acme@example.com",
    phone: "+23480000001",
    address: "1 Acme Lane, Ikeja, Lagos",
    created_at: "2025-01-04",
    total_orders: 23,
    total_spent: 245000,
    category: "Corporate",
    status: "Active",
  },
  {
    id: "C002",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+23480000002",
    address: "21 Freedom St., Abuja",
    created_at: "2025-02-15",
    total_orders: 7,
    total_spent: 42000,
    category: "Individual",
    status: "Active",
  },
  {
    id: "C003",
    name: "XYZ Foods",
    email: "contact@xyzfoods.com",
    phone: "+23480000003",
    address: "55 Unity Rd., Ibadan",
    created_at: "2025-03-19",
    total_orders: 15,
    total_spent: 180000,
    category: "Corporate",
    status: "Active",
  },
  {
    id: "C004",
    name: "John Smith",
    email: "john@example.com",
    phone: "+23480000004",
    address: "12 Park Avenue, Port Harcourt",
    created_at: "2025-02-28",
    total_orders: 3,
    total_spent: 14500,
    category: "Individual",
    status: "Inactive",
  },
  {
    id: "C005",
    name: "Global Enterprises",
    email: "info@globalent.com",
    phone: "+23480000005",
    address: "100 Business District, Lagos",
    created_at: "2025-01-15",
    total_orders: 42,
    total_spent: 750000,
    category: "Corporate",
    status: "Active",
  },
];

export default function SalesCustomers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter customers based on search and filters
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      categoryFilter === "All" || 
      customer.category === categoryFilter;
      
    const matchesStatus = 
      statusFilter === "All" || 
      customer.status === statusFilter;
      
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Count statistics
  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(c => c.status === "Active").length;
  const corporateCustomers = mockCustomers.filter(c => c.category === "Corporate").length;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Customers</h1>
            <p className="text-muted-foreground">Manage your customer database</p>
          </div>
          
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <UserRound className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{activeCustomers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Corporate</p>
                <p className="text-2xl font-bold">{corporateCustomers}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>View and manage your customer database</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant={categoryFilter === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("All")}
                >
                  All Types
                </Button>
                <Button 
                  variant={categoryFilter === "Corporate" ? "secondary" : "outline"} 
                  size="sm"
                  onClick={() => setCategoryFilter("Corporate")}
                >
                  Corporate
                </Button>
                <Button 
                  variant={categoryFilter === "Individual" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("Individual")}
                >
                  Individual
                </Button>
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
                  variant={statusFilter === "Inactive" ? "outline" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("Inactive")}
                >
                  Inactive
                </Button>
              </div>
            </div>

            {/* Customers Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="group">
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[150px]">{customer.address}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MailIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>{customer.total_orders}</TableCell>
                      <TableCell>₦{customer.total_spent.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={customer.category === "Corporate" ? "secondary" : "outline"}>
                          {customer.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={customer.status === "Active" ? "success" : "warning"}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.created_at}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <UserRound className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredCustomers.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No customers found</p>
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
