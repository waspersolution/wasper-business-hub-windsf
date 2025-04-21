
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
import { Eye } from "lucide-react";
import { JournalEntry } from "../JournalEntries";

interface JournalEntriesTableProps {
  journalEntries: JournalEntry[];
  handleViewEntry: (entry: JournalEntry) => void;
  getStatusColor: (status: "draft" | "posted" | "reversed") => string;
}

export function JournalEntriesTable({
  journalEntries,
  handleViewEntry,
  getStatusColor
}: JournalEntriesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entry #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden lg:table-cell">Created By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {journalEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.entry_number}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">
                {entry.description}
              </TableCell>
              <TableCell className="font-mono">
                ₦{entry.total_amount.toLocaleString()}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{entry.created_by}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(entry.status)}>
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => handleViewEntry(entry)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
