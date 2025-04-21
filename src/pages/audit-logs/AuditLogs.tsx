
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockAuditLogs = [
  {
    id: "LOG001",
    action: "User login",
    user: "Jane Doe",
    detail: "User Jane logged in",
    date: "2025-04-20 09:31",
  },
  {
    id: "LOG002",
    action: "Sale posted",
    user: "Chidi Okafor",
    detail: "Sale S001 recorded",
    date: "2025-04-20 10:02",
  },
];

export default function AuditLogs() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Audit Logs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Log ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAuditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.id}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.user}</TableCell>
              <TableCell>{log.detail}</TableCell>
              <TableCell>{log.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
