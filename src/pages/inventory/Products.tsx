
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

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
];

export default function Products() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Cost Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell>₦{product.cost_price.toLocaleString()}</TableCell>
              <TableCell>₦{product.selling_price.toLocaleString()}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
