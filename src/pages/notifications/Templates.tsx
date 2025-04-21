
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockTemplates = [
  {
    id: "TMP001",
    name: "Order Confirmation",
    type: "Email",
    updated_at: "2025-03-21",
    status: "active",
  },
  {
    id: "TMP002",
    name: "Low Stock Alert",
    type: "SMS",
    updated_at: "2025-01-19",
    status: "inactive",
  },
];

export default function NotificationTemplates() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Notification Templates</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockTemplates.map((tpl) => (
            <TableRow key={tpl.id}>
              <TableCell>{tpl.id}</TableCell>
              <TableCell>{tpl.name}</TableCell>
              <TableCell>{tpl.type}</TableCell>
              <TableCell>
                <span className={tpl.status === "active" ? "text-green-700" : "text-gray-500"}>
                  {tpl.status.charAt(0).toUpperCase() + tpl.status.slice(1)}
                </span>
              </TableCell>
              <TableCell>{tpl.updated_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
