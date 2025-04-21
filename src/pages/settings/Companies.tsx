
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockCompanies = [
  {
    id: "COMP001",
    name: "Acme Corp",
    type: "Company",
    status: "active",
    created_at: "2025-02-11",
  },
  {
    id: "BR001",
    name: "Ikeja Branch",
    type: "Branch",
    status: "active",
    created_at: "2025-03-01",
  },
  {
    id: "BR002",
    name: "Apapa Branch",
    type: "Branch",
    status: "inactive",
    created_at: "2025-03-08",
  },
];

export default function CompaniesBranches() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Companies &amp; Branches</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCompanies.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                <span className={row.status === "active" ? "text-green-700" : "text-gray-500"}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{row.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
