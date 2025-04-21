
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, ArrowUpRight } from "lucide-react";
import { JournalEntry } from "../JournalEntries";

interface JournalEntriesTableProps {
  journalEntries: JournalEntry[];
  handleViewEntry: (entry: JournalEntry) => void;
  getStatusColor: (status: "draft" | "posted" | "reversed") => "success" | "outline" | "warning" | "danger" | "default" | "destructive" | "secondary" | "info";
}

export function JournalEntriesTable({
  journalEntries,
  handleViewEntry,
  getStatusColor
}: JournalEntriesTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Entry #</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="hidden md:table-cell font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="hidden lg:table-cell font-semibold">Created By</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journalEntries.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-muted/30 group">
              <TableCell className="font-semibold text-blue-600 dark:text-blue-400">
                {entry.entry_number}
              </TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {entry.description}
              </TableCell>
              <TableCell className="font-mono font-medium">
                ₦{entry.total_amount.toLocaleString()}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{entry.created_by}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(entry.status)} className="capitalize">
                  {entry.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => handleViewEntry(entry)}
                  variant="ghost"
                  size="sm"
                  className="hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:translate-x-1 group-hover:translate-y-0 duration-200"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                  <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
