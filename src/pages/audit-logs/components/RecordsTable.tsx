
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileEdit, Trash, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface Record {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  entityName: string;
  user: string;
  module: string;
  date: string;
  changes: Array<{
    field: string;
    oldValue: string;
    newValue: string;
  }>;
}

interface RecordsTableProps {
  records: Record[];
  onViewDetails: (record: Record) => void;
}

export function RecordsTable({ records, onViewDetails }: RecordsTableProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'update':
        return <FileEdit className="h-4 w-4 text-blue-500" />;
      case 'delete':
        return <Trash className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return "bg-green-100 text-green-800 border-green-200";
      case 'update':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'delete':
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead className="hidden md:table-cell">Entity ID</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="hidden md:table-cell">Module</TableHead>
            <TableHead>Date/Time</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-mono text-xs">{record.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {getActionIcon(record.action)}
                  <Badge variant="outline" className={cn("capitalize", getActionColor(record.action))}>
                    {record.action}
                  </Badge>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{record.entityName}</div>
                  <div className="text-xs text-muted-foreground">{record.entity}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell font-mono">
                {record.entityId}
              </TableCell>
              <TableCell>{record.user}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className="capitalize">
                  {record.module}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.date}
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onViewDetails(record)}
                >
                  <History className="h-4 w-4" />
                  View Changes
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
