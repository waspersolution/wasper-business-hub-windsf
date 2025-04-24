
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle } from "lucide-react";
import { useState } from "react";

// Mock data for supplier groups
const mockSupplierGroups = [
  {
    id: "SG-001",
    name: "Premium Suppliers",
    description: "Top-tier suppliers with priority status",
    suppliers: 8,
    payment_terms: "Net 30",
    status: "active",
  },
  {
    id: "SG-002",
    name: "Regular Suppliers",
    description: "Standard suppliers for regular inventory",
    suppliers: 15,
    payment_terms: "Net 45",
    status: "active",
  },
  {
    id: "SG-003",
    name: "Seasonal Suppliers",
    description: "Suppliers used only for seasonal products",
    suppliers: 6,
    payment_terms: "Net 60",
    status: "inactive",
  },
  {
    id: "SG-004",
    name: "International Suppliers",
    description: "Overseas suppliers for imported goods",
    suppliers: 10,
    payment_terms: "Letter of Credit",
    status: "active",
  },
  {
    id: "SG-005",
    name: "Local Vendors",
    description: "Small local businesses and artisans",
    suppliers: 12,
    payment_terms: "Net 15",
    status: "active",
  },
];

export default function SupplierGroups() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter supplier groups based on search term
  const filteredGroups = mockSupplierGroups.filter(group => {
    return group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           group.description.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Supplier Groups</h1>
            <p className="text-muted-foreground mt-1">
              Organize and manage your supplier categories
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Group
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Supplier Groups List</CardTitle>
            <CardDescription>
              View and manage supplier categorization and terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or description..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Group Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Suppliers</TableHead>
                    <TableHead>Payment Terms</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No supplier groups found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredGroups.map((group) => (
                      <TableRow key={group.id}>
                        <TableCell>{group.id}</TableCell>
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.description}</TableCell>
                        <TableCell>{group.suppliers}</TableCell>
                        <TableCell>{group.payment_terms}</TableCell>
                        <TableCell>
                          <Badge variant={group.status === "active" ? "success" : "secondary"}>
                            {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
