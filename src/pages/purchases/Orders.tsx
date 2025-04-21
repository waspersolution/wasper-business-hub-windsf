
import { useState } from "react";
import { 
  ClipboardList, 
  PlusCircle, 
  Download, 
  Search, 
  Filter, 
  FileText,
  CheckCircle,
  XCircle,
  ChevronDown
} from "lucide-react";
import { Layout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const mockOrders = [
  {
    id: "PO001",
    supplier: "ABC Suppliers",
    supplier_id: "S001",
    total: 95000,
    status: "pending",
    expected_delivery: "2025-04-25",
    created_at: "2025-04-19",
    items: 12,
    approved_by: null,
    contact_email: "abc_suppliers@gmail.com",
    contact_phone: "+23480000123",
    notes: "Urgent delivery needed"
  },
  {
    id: "PO002",
    supplier: "XYZ Traders",
    supplier_id: "S002",
    total: 47400,
    status: "received",
    expected_delivery: "2025-04-10",
    created_at: "2025-04-08",
    items: 7,
    approved_by: "Jane Smith",
    contact_email: "xyz_traders@gmail.com",
    contact_phone: "+23480000456",
    notes: ""
  },
  {
    id: "PO003",
    supplier: "Global Imports",
    supplier_id: "S003",
    total: 128600,
    status: "ordered",
    expected_delivery: "2025-04-30",
    created_at: "2025-04-20",
    items: 15,
    approved_by: "John Doe",
    contact_email: "global_imports@gmail.com",
    contact_phone: "+23480000789",
    notes: "International shipping"
  },
  {
    id: "PO004",
    supplier: "Local Distributors",
    supplier_id: "S004",
    total: 32500,
    status: "cancelled",
    expected_delivery: "2025-04-22",
    created_at: "2025-04-15",
    items: 5,
    approved_by: null,
    contact_email: "local_dist@gmail.com",
    contact_phone: "+23480001234",
    notes: "Cancelled due to pricing issues"
  },
  {
    id: "PO005",
    supplier: "Premium Suppliers",
    supplier_id: "S005",
    total: 215000,
    status: "pending",
    expected_delivery: "2025-05-05",
    created_at: "2025-04-21",
    items: 23,
    approved_by: null,
    contact_email: "premium_suppliers@gmail.com",
    contact_phone: "+23480005678",
    notes: "Bulk order with special pricing"
  }
];

const OrderDetailsDialog = ({ order, open, onOpenChange }) => {
  if (!order) return null;
  
  const getStatusColor = (status) => {
    switch (status) {
      case "received": return "success";
      case "ordered": return "info";
      case "pending": return "warning";
      case "cancelled": return "danger";
      default: return "outline";
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <ClipboardList size={20} />
            Purchase Order - {order.id}
          </DialogTitle>
          <DialogDescription>
            Order for {order.supplier} created on {order.created_at}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="items">Order Items</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Supplier</div>
                <div className="font-medium">{order.supplier}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Date Created</div>
                <div className="font-medium">{order.created_at}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Status</div>
                <div>
                  <Badge variant={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Expected Delivery</div>
                <div className="font-medium">{order.expected_delivery}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Approved By</div>
                <div className="font-medium">{order.approved_by || "Pending Approval"}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Items</div>
                <div className="font-medium">{order.items}</div>
              </div>
              <div className="col-span-2 space-y-2">
                <div className="text-sm text-muted-foreground">Notes</div>
                <div className="font-medium">{order.notes || "No notes"}</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between pt-2">
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold">₦{order.total.toLocaleString()}</div>
              </div>
              <div className="space-x-2">
                {order.status === "pending" && (
                  <>
                    <Button size="sm" variant="success">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Print PO
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
                    <TableCell>10</TableCell>
                    <TableCell>₦5,000</TableCell>
                    <TableCell>₦50,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sample Product 2</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>₦9,000</TableCell>
                    <TableCell>₦45,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="supplier">
            <div className="pt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Supplier ID</div>
                  <div className="font-medium">{order.supplier_id}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Supplier Name</div>
                  <div className="font-medium">{order.supplier}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Contact Email</div>
                  <div className="font-medium">{order.contact_email}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Contact Phone</div>
                  <div className="font-medium">{order.contact_phone}</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">View Supplier Profile</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [createOrderDialog, setCreateOrderDialog] = useState(false);
  
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case "received": return "success";
      case "ordered": return "info";
      case "pending": return "warning";
      case "cancelled": return "danger";
      default: return "outline";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Purchase Orders</h1>
            <p className="text-muted-foreground">Create and manage purchase orders</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            
            <Button onClick={() => setCreateOrderDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Purchase Order
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
                  placeholder="Search by supplier or PO ID..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ordered">Ordered</SelectItem>
                    <SelectItem value="received">Received</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 ml-auto">
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
                        <h4 className="font-medium">Expected Delivery</h4>
                        <div className="flex gap-2">
                          <Input type="date" className="w-full" placeholder="From" />
                          <Input type="date" className="w-full" placeholder="To" />
                        </div>
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
        
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockOrders.length}</div>
              <p className="text-sm text-muted-foreground">Active purchase orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">
                {mockOrders.filter(o => o.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Orders awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">In Transit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">
                {mockOrders.filter(o => o.status === "ordered").length}
              </div>
              <p className="text-sm text-muted-foreground">Orders in delivery</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {mockOrders.filter(o => {
                  const date = new Date(o.created_at);
                  const now = new Date();
                  const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </div>
              <p className="text-sm text-muted-foreground">New orders this week</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead className="hidden lg:table-cell">Expected Delivery</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewOrder(order)}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.supplier}</TableCell>
                      <TableCell className="hidden md:table-cell">{order.created_at}</TableCell>
                      <TableCell className="hidden lg:table-cell">{order.expected_delivery}</TableCell>
                      <TableCell>₦{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button onClick={(e) => {
                          e.stopPropagation();
                          handleViewOrder(order);
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
      
      <OrderDetailsDialog
        order={selectedOrder}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      
      <Dialog open={createOrderDialog} onOpenChange={setCreateOrderDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Purchase Order</DialogTitle>
            <DialogDescription>
              Fill out the details below to create a new purchase order
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="supplier" className="text-sm font-medium">Supplier</label>
                <Select>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s1">ABC Suppliers</SelectItem>
                    <SelectItem value="s2">XYZ Traders</SelectItem>
                    <SelectItem value="s3">Global Imports</SelectItem>
                    <SelectItem value="s4">Local Distributors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="expected" className="text-sm font-medium">Expected Delivery</label>
                <Input type="date" id="expected" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Order Items</label>
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
                    <TableCell>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="p1">Product 1</SelectItem>
                          <SelectItem value="p2">Product 2</SelectItem>
                          <SelectItem value="p3">Product 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="1" defaultValue="1" />
                    </TableCell>
                    <TableCell>₦5,000</TableCell>
                    <TableCell>₦5,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="text-right">
                <Button variant="outline" size="sm">+ Add Item</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">Notes</label>
              <Input id="notes" placeholder="Add any additional notes..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOrderDialog(false)}>
              Cancel
            </Button>
            <Button>Create Purchase Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
