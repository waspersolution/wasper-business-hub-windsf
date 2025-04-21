
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

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
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          aria-label="Go back to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-xl font-bold">Companies &amp; Branches</h1>
      </div>
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
