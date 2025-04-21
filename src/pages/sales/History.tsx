
import { useState } from "react";
import { 
  Calendar, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  FileText,
  ChevronDown
} from "lucide-react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const mockSalesHistory = [
  {
    id: "S001",
    customer: "Acme Corp",
    customer_id: "C001",
    total: 12000,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-21",
    items: 4,
    invoice_number: "INV-2025-0421",
    staff: "Jane Smith"
  },
  {
    id: "S004",
    customer: "Delta Ltd",
    customer_id: "C004",
    total: 8000,
    payment_method: "cash",
    status: "cancelled",
    created_at: "2025-04-20",
    items: 2,
    invoice_number: "INV-2025-0420",
    staff: "John Doe"
  },
  {
    id: "S002",
    customer: "Jane Doe",
    customer_id: "C002",
    total: 5000,
    payment_method: "cash",
    status: "pending",
    created_at: "2025-04-21",
    items: 1,
    invoice_number: "INV-2025-0421-2",
    staff: "Alex Johnson"
  },
  {
    id: "S003",
    customer: "Bravo Enterprises",
    customer_id: "C003",
    total: 15700,
    payment_method: "transfer",
    status: "completed",
    created_at: "2025-04-19",
    items: 6,
    invoice_number: "INV-2025-0419",
    staff: "Jane Smith"
  },
  {
    id: "S005",
    customer: "Echo Systems",
    customer_id: "C005",
    total: 23400,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-18",
    items: 7,
    invoice_number: "INV-2025-0418",
    staff: "Mike Wilson"
  },
];

const SaleDetailsDialog = ({ sale, open, onOpenChange }) => {
  if (!sale) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText size={20} />
            Sale Details - {sale.invoice_number}
          </DialogTitle>
          <DialogDescription>
            Sale {sale.id} for {sale.customer} on {sale.created_at}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Customer</div>
                <div className="font-medium">{sale.customer}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date</div>
                <div className="font-medium">{sale.created_at}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Status</div>
                <div>
                  <Badge
                    variant={
                      sale.status === "completed"
                        ? "success"
                        : sale.status === "pending"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {sale.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Payment Method</div>
                <div className="font-medium capitalize">{sale.payment_method}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Processed By</div>
                <div className="font-medium">{sale.staff}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Items</div>
                <div className="font-medium">{sale.items}</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between pt-2">
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold">₦{sale.total.toLocaleString()}</div>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Print Invoice
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="items">
            <div className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Sample Product 1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>₦2,000</TableCell>
                    <TableCell>₦4,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sample Product 2</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>₦8,000</TableCell>
                    <TableCell>₦8,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="payments">
            <div className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{sale.created_at}</TableCell>
                    <TableCell className="capitalize">{sale.payment_method}</TableCell>
                    <TableCell>₦{sale.total.toLocaleString()}</TableCell>
                    <TableCell>REF-{sale.id}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default function SalesHistory() {
  const [selectedSale, setSelectedSale] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  const filteredSales = mockSalesHistory.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleViewSale = (sale) => {
    setSelectedSale(sale);
    setDialogOpen(true);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "success";
      case "pending": return "warning";
      case "cancelled": return "danger";
      default: return "outline";
    }
  };

  const getPaymentMethodDisplay = (method) => {
    switch (method) {
      case "card": return "Credit/Debit Card";
      case "cash": return "Cash";
      case "transfer": return "Bank Transfer";
      default: return method;
    }
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Sales History</h1>
            <p className="text-muted-foreground">Track and manage all sales transactions</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filters & Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-1/3">
                <Input
                  placeholder="Search by customer or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
                />
              </div>
              
              <div className="w-full sm:w-1/4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Advanced Filters
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Date Range</h4>
                        <div className="flex gap-2">
                          <Input type="date" className="w-full" placeholder="From" />
                          <Input type="date" className="w-full" placeholder="To" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Payment Method</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Payment Methods" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Methods</SelectItem>
                            <SelectItem value="card">Card</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Amount Range</h4>
                        <div className="flex gap-2">
                          <Input type="number" className="w-full" placeholder="Min" />
                          <Input type="number" className="w-full" placeholder="Max" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Reset</Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Sales Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden lg:table-cell">Payment</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.map((sale) => (
                    <TableRow key={sale.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewSale(sale)}>
                      <TableCell>{sale.id}</TableCell>
                      <TableCell>{sale.invoice_number}</TableCell>
                      <TableCell>{sale.customer}</TableCell>
                      <TableCell className="hidden md:table-cell">{sale.created_at}</TableCell>
                      <TableCell className="hidden lg:table-cell">{getPaymentMethodDisplay(sale.payment_method)}</TableCell>
                      <TableCell>₦{sale.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(sale.status)}>
                          {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button onClick={(e) => {
                          e.stopPropagation();
                          handleViewSale(sale);
                        }} variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <SaleDetailsDialog
        sale={selectedSale}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </DashboardLayout>
  );
}
