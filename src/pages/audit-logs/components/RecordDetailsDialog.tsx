
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, FileEdit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecordDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  record: any;
}

export function RecordDetailsDialog({ isOpen, onOpenChange, record }: RecordDetailsDialogProps) {
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

  if (!record) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Record Change Details</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-2 mt-1">
              {getActionIcon(record.action)}
              <Badge className={cn("capitalize", getActionColor(record.action))}>
                {record.action}
              </Badge>
              <span className="text-sm"> | </span>
              <span className="text-sm">{record.date}</span>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium">Entity: {record.entityName} ({record.entity})</p>
              <p className="text-sm font-medium">ID: {record.entityId}</p>
              <p className="text-sm">Changed by: {record.user}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Old Value</TableHead>
                <TableHead>New Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {record.changes.map((change: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{change.field.replace('_', ' ')}</TableCell>
                  <TableCell className={change.oldValue === "" ? "text-muted-foreground italic" : ""}>
                    {change.oldValue || "None"}
                  </TableCell>
                  <TableCell className={change.newValue === "" ? "text-muted-foreground italic" : ""}>
                    {change.newValue || "None"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
