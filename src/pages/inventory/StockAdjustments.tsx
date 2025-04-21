
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock stock adjustment data
const mockAdjustments = [
  {
    id: "A001",
    product: "Premium Bag of Rice",
    type: "Add",
    quantity: 15,
    note: "Initial stock",
    user: "Chidi Okafor",
    date: "2025-01-09",
  },
  {
    id: "A002",
    product: "Cooking Oil - 5L",
    type: "Remove",
    quantity: 4,
    note: "Damaged bottles",
    user: "Bukola Adebimpe",
    date: "2025-02-10",
  },
  {
    id: "A003",
    product: "Spaghetti 500g",
    type: "Add",
    quantity: 30,
    note: "Restock",
    user: "John Doe",
    date: "2025-03-03",
  },
  {
    id: "A004",
    product: "Indomie Chicken Flavor 70g",
    type: "Add",
    quantity: 50,
    note: "New shipment arrived",
    user: "Bukola Adebimpe",
    date: "2025-03-05",
  },
  {
    id: "A005",
    product: "Peak Milk Powder 400g",
    type: "Remove",
    quantity: 3,
    note: "Expired products",
    user: "Chidi Okafor",
    date: "2025-03-08",
  },
];

export default function StockAdjustments() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter adjustments based on search query
  const filteredAdjustments = mockAdjustments.filter(adj => {
    return (
      adj.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adj.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adj.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adj.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Stock Adjustments</h1>
            <p className="text-muted-foreground">Manage inventory adjustments and corrections</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Adjustment
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4" />
              Add Stock
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              Remove Stock
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Adjustment Records</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by product, user, or note..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="mr-1 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Adjustments Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adjustment ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdjustments.map((adj) => (
                    <TableRow key={adj.id}>
                      <TableCell className="font-medium">{adj.id}</TableCell>
                      <TableCell>{adj.product}</TableCell>
                      <TableCell>
                        <Badge variant={adj.type === "Add" ? "success" : "danger"}>
                          {adj.type === "Add" ? 
                            <ArrowUp className="mr-1 h-3 w-3 inline" /> : 
                            <ArrowDown className="mr-1 h-3 w-3 inline" />}
                          {adj.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {adj.type === "Add" ? "+" : "-"}{adj.quantity}
                      </TableCell>
                      <TableCell>{adj.note}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-wasper-light flex items-center justify-center text-xs font-medium text-wasper-primary">
                            {adj.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          {adj.user}
                        </div>
                      </TableCell>
                      <TableCell>{adj.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredAdjustments.length === 0 && (
                <div className="py-8 text-center">
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No adjustments found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
            
            {/* Pagination would go here */}
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <div>Showing {filteredAdjustments.length} of {mockAdjustments.length} adjustments</div>
              <div className="flex items-center gap-2">
                <span>Page 1 of 1</span>
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
