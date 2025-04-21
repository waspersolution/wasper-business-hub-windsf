
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockAttributes = [
  {
    id: "CAT001",
    type: "Category",
    name: "Grains",
    item_count: 6,
    created_at: "2025-01-10",
  },
  {
    id: "BRD001",
    type: "Brand",
    name: "Mama Gold",
    item_count: 2,
    created_at: "2025-01-15",
  },
  {
    id: "UNT001",
    type: "Unit",
    name: "Bag",
    item_count: 4,
    created_at: "2025-02-01",
  },
];

export default function Attributes() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Units/Categories/Brands</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Items Linked</TableHead>
            <TableHead>Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAttributes.map((attr) => (
            <TableRow key={attr.id}>
              <TableCell>{attr.id}</TableCell>
              <TableCell>{attr.type}</TableCell>
              <TableCell>{attr.name}</TableCell>
              <TableCell>{attr.item_count}</TableCell>
              <TableCell>{attr.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
