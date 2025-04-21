
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload, 
  Package as PackageIcon, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  BarChart2 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock products data
const mockProducts = [
  {
    id: "P001",
    name: "Premium Bag of Rice",
    sku: "RBAG5000",
    category: "Grains",
    brand: "Mama Gold",
    unit: "Bag",
    cost_price: 28000,
    selling_price: 31000,
    stock: 23,
    created_at: "2025-01-10",
  },
  {
    id: "P002",
    name: "Cooking Oil - 5L",
    sku: "COIL5L",
    category: "Oil",
    brand: "Devon King's",
    unit: "Bottle",
    cost_price: 9500,
    selling_price: 10800,
    stock: 17,
    created_at: "2025-01-22",
  },
  {
    id: "P003",
    name: "Spaghetti 500g",
    sku: "SPG500",
    category: "Pasta",
    brand: "Golden Penny",
    unit: "Pack",
    cost_price: 520,
    selling_price: 610,
    stock: 55,
    created_at: "2025-02-15",
  },
  {
    id: "P004",
    name: "Indomie Chicken Flavor 70g",
    sku: "INDCHN70",
    category: "Noodles",
    brand: "Indomie",
    unit: "Pack",
    cost_price: 180,
    selling_price: 220,
    stock: 122,
    created_at: "2025-02-10",
  },
  {
    id: "P005",
    name: "Peak Milk Powder 400g",
    sku: "PKMK400",
    category: "Dairy",
    brand: "Peak",
    unit: "Tin",
    cost_price: 2200,
    selling_price: 2450,
    stock: 30,
    created_at: "2025-01-28",
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter products based on search query
  const filteredProducts = mockProducts.filter(product => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wasper-primary">Products</h1>
            <p className="text-muted-foreground">Manage your inventory products</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-wasper-light p-3 rounded-full">
                <PackageIcon className="h-6 w-6 text-wasper-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{mockProducts.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <BarChart2 className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <PackageIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₦1.2M</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <PackageIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader className="p-4 pb-0">
            <CardTitle>Products List</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products by name, SKU, category or brand..."
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

            {/* Products Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Cost Price</TableHead>
                    <TableHead>Selling Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="group">
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-wasper-light rounded-md mr-2 flex items-center justify-center text-wasper-primary">
                            {product.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.sku}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category}</Badge>
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>₦{product.cost_price.toLocaleString()}</TableCell>
                      <TableCell>₦{product.selling_price.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`${
                          product.stock < 10 ? "text-red-500" : 
                          product.stock < 20 ? "text-amber-500" : 
                          "text-green-600"
                        } font-medium`}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredProducts.length === 0 && (
                <div className="py-8 text-center">
                  <PackageIcon className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
                  <p className="mt-2 text-lg font-semibold text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
            
            {/* Pagination would go here */}
            <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
              <div>Showing {filteredProducts.length} of {mockProducts.length} products</div>
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
