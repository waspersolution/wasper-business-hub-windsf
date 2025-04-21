
// This moves the JournalEntryDialog from JournalEntries.tsx
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Download, BookOpen } from "lucide-react";
import { JournalEntry } from "../JournalEntries";
import { mockJournalLines } from "../JournalEntries";

export function JournalEntryDialog({ entry, open, onOpenChange }) {
  if (!entry) return null;
  const lines = mockJournalLines[entry.id] || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <BookOpen size={20} />
            Journal Entry - {entry.entry_number}
          </DialogTitle>
          <DialogDescription>
            Created on {entry.created_at} by {entry.created_by}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="font-medium">{entry.date}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Status</div>
              <div>
                <Badge
                  variant={
                    entry.status === "posted"
                      ? "success"
                      : entry.status === "draft"
                      ? "outline"
                      : "warning"
                  }
                >
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Amount</div>
              <div className="font-medium">₦{entry.total_amount.toLocaleString()}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Description</div>
            <div className="font-medium">{entry.description}</div>
          </div>
          <Separator />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Code</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>{line.account_code}</TableCell>
                    <TableCell>{line.account_name}</TableCell>
                    <TableCell>{line.description}</TableCell>
                    <TableCell className="text-right font-mono">
                      {line.debit > 0 ? `₦${line.debit.toLocaleString()}` : ""}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {line.credit > 0 ? `₦${line.credit.toLocaleString()}` : ""}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ₦{lines.reduce((sum, line) => sum + line.debit, 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono font-medium">
                    ₦{lines.reduce((sum, line) => sum + line.credit, 0).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          {entry.status === "draft" && (
            <>
              <Button variant="outline">Edit</Button>
              <Button variant="success">Post Entry</Button>
            </>
          )}
          {entry.status === "posted" && !entry.id.includes("J005") && (
            <Button variant="destructive">Reverse Entry</Button>
          )}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
