
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Calendar, 
  CreditCard, 
  Users, 
  Bell,
  UserRound,
  FilePlus,
  Timer,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock payment plans data
const mockPaymentPlans = [
  {
    id: "P001",
    name: "Premium Store Equipment",
    customer: "Acme Corp",
    customer_id: "C001",
    total_amount: 1500000,
    installments: 6,
    installment_amount: 250000,
    start_date: "2025-01-15",
    next_date: "2025-04-15",
    status: "Active",
    payments_made: 3,
    remaining_amount: 750000
  },
  {
    id: "P002",
    name: "Restaurant Equipment",
    customer: "XYZ Foods",
    customer_id: "C003",
    total_amount: 850000,
    installments: 4,
    installment_amount: 212500,
    start_date: "2025-02-10",
    next_date: "2025-04-10",
    status: "Active",
    payments_made: 2,
    remaining_amount: 425000
  },
  {
    id: "P003",
    name: "Retail Renovation",
    customer: "Global Enterprises",
    customer_id: "C005",
    total_amount: 3500000,
    installments: 12,
    installment_amount: 291666,
    start_date: "2025-01-01",
    next_date: "2025-04-01",
    status: "Overdue",
    payments_made: 3,
    remaining_amount: 2625002
  },
  {
    id: "P004",
    name: "Bulk Order - March 2025",
    customer: "Green Foods Ltd",
    customer_id: "C008",
    total_amount: 450000,
    installments: 3,
    installment_amount: 150000,
    start_date: "2025-03-20",
    next_date: "2025-04-20",
    status: "Active",
    payments_made: 1,
    remaining_amount: 300000
  },
  {
    id: "P005",
    name: "Office Furniture",
    customer: "Tech Solutions",
    customer_id: "C012",
    total_amount: 680000,
    installments: 4,
    installment_amount: 170000,
    start_date: "2024-12-15",
    next_date: "2025-03-15",
    status: "Completed",
    payments_made: 4,
    remaining_amount: 0
  }
];

export default function PaymentPlans() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Filter payment plans based on search and status
  const filteredPlans = mockPaymentPlans.filter(plan => {
    const matchesSearch = 
      plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plan.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = 
      statusFilter === "All" || 
      plan.status === statusFilter;
      
    return matchesSearch && matchesStatus;
  });
  
  // Calculate statistics
  const activeCount = mockPaymentPlans.filter(p => p.status === "Active").length;
  const overdueCount = mockPaymentPlans.filter(p => p.status === "Overdue").length;
  const totalOutstanding = mockPaymentPlans.reduce((sum, plan) => sum + plan.remaining_amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Payment Plans</h1>
            <p className="text-muted-foreground">Manage installment payment plans and track due dates</p>
          </div>
          
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Payment Plan
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{activeCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue Plans</p>
                <p className="text-2xl font-bold">{overdueCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Amount</p>
                <p className="text-2xl font-bold">₦{totalOutstanding.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Payment Plans</CardTitle>
            <CardDescription>Track installment payments and upcoming dues</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search plans by name or customer..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button 
                  variant={statusFilter === "All" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("All")}
                >
                  All
                </Button>
                <Button 
                  variant={statusFilter === "Active" ? "secondary" : "outline"} 
                  size="sm"
                  onClick={() => setStatusFilter("Active")}
                >
                  Active
                </Button>
                <Button 
                  variant={statusFilter === "Overdue" ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("Overdue")}
                >
                  Overdue
                </Button>
                <Button 
                  variant={statusFilter === "Completed" ? "outline" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("Completed")}
                >
                  Completed
                </Button>
              </div>
            </div>

            {/* Payment Plans Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Installments</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Next Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.map((plan) => (
                    <TableRow key={plan.id} className="group">
                      <TableCell className="font-medium">{plan.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{plan.name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserRound className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell>₦{plan.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{plan.payments_made} of {plan.installments}</span>
                          <span className="text-xs text-muted-foreground">₦{plan.installment_amount.toLocaleString()} each</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-full rounded-full ${
                                plan.status === "Completed" ? "bg-green-500" :
                                plan.status === "Overdue" ? "bg-red-500" : "bg-blue-500"
                              }`} 
                              style={{width: `${(plan.payments_made / plan.installments) * 100}%`}}
                            />
                          </div>
                          <span className="text-sm">
                            {Math.round((plan.payments_made / plan.installments) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{plan.status === "Completed" ? "-" : plan.next_date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            plan.status === "Active" ? "success" :
                            plan.status === "Overdue" ? "danger" :
                            plan.status === "Completed" ? "secondary" : "outline"
                          }
                        >
                          {plan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            View
                          </Button>
                          {plan.status !== "Completed" && (
                            <Button size="sm" variant="secondary" className="flex items-center gap-1">
                              Record Payment
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredPlans.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No payment plans found</p>
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
