
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { SalesFilters } from "./components/SalesFilters";
import { SalesTable } from "./components/SalesTable";
import { SaleDetailsDialog } from "./components/SaleDetailsDialog";
import { Sale } from "@/types/sales";

// Extend the Sale type with UI-specific display properties
export type SaleWithUIDetails = Sale & {
  _customer?: string;
  _items?: number;
  _invoice_number?: string;
  _staff?: string;
};

const mockSalesHistory: SaleWithUIDetails[] = [
  {
    id: "S001",
    branch_id: "B001",
    customer_id: "C001",
    total: 12000,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-21",
    created_by: "U001",
    _customer: "Acme Corp",
    _items: 4,
    _invoice_number: "INV-2025-0421",
    _staff: "Jane Smith"
  },
  {
    id: "S004",
    branch_id: "B001",
    customer_id: "C004",
    total: 8000,
    payment_method: "cash",
    status: "cancelled",
    created_at: "2025-04-20",
    created_by: "U002",
    _customer: "Delta Ltd",
    _items: 2,
    _invoice_number: "INV-2025-0420",
    _staff: "John Doe"
  },
  {
    id: "S002",
    branch_id: "B001",
    customer_id: "C002",
    total: 5000,
    payment_method: "cash",
    status: "pending",
    created_at: "2025-04-21",
    created_by: "U003",
    _customer: "Jane Doe",
    _items: 1,
    _invoice_number: "INV-2025-0421-2",
    _staff: "Alex Johnson"
  },
  {
    id: "S003",
    branch_id: "B001",
    customer_id: "C003",
    total: 15700,
    payment_method: "transfer",
    status: "completed",
    created_at: "2025-04-19",
    created_by: "U001",
    _customer: "Bravo Enterprises",
    _items: 6,
    _invoice_number: "INV-2025-0419",
    _staff: "Jane Smith"
  },
  {
    id: "S005",
    branch_id: "B001",
    customer_id: "C005",
    total: 23400,
    payment_method: "card",
    status: "completed",
    created_at: "2025-04-18",
    created_by: "U004",
    _customer: "Echo Systems",
    _items: 7,
    _invoice_number: "INV-2025-0418",
    _staff: "Mike Wilson"
  },
];

export default function SalesHistory() {
  const [selectedSale, setSelectedSale] = useState<SaleWithUIDetails | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSales = mockSalesHistory.filter(sale => {
    const matchesSearch = (sale._customer?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewSale = (sale: SaleWithUIDetails) => {
    setSelectedSale(sale);
    setDialogOpen(true);
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
            <SalesFilters
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>Sales Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesTable
              sales={filteredSales}
              onView={handleViewSale}
            />
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
