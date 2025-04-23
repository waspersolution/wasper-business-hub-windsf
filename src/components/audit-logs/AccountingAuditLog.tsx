
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileCheck, FileX, FileEdit } from "lucide-react";

interface AccountingAuditLogProps {
  logs: Array<{
    id: string;
    action: 'create' | 'update' | 'delete';
    entity: string;
    entityId: string;
    entityName: string;
    user: string;
    timestamp: string;
  }>;
}

export function AccountingAuditLog({ logs }: AccountingAuditLogProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <FileCheck className="h-4 w-4 text-green-500" />;
      case 'update':
        return <FileEdit className="h-4 w-4 text-blue-500" />;
      case 'delete':
        return <FileX className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return "bg-green-100 text-green-800";
      case 'update':
        return "bg-blue-100 text-blue-800";
      case 'delete':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>User</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getActionIcon(log.action)}
                <Badge className={getActionColor(log.action)}>
                  {log.action}
                </Badge>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{log.entityName}</div>
                <div className="text-sm text-muted-foreground">{log.entity}</div>
              </div>
            </TableCell>
            <TableCell>{log.user}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
