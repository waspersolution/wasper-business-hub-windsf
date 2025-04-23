
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, BookOpen } from "lucide-react";
import { JournalEntry } from "../JournalEntries";
import { mockJournalLines } from "../data/mockJournalData";
import { EntryDetails } from "./journal-entry/EntryDetails";
import { JournalLinesDetailTable } from "./journal-entry/JournalLinesDetailTable";

interface JournalEntryDialogProps {
  entry: JournalEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JournalEntryDialog({ entry, open, onOpenChange }: JournalEntryDialogProps) {
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

        <EntryDetails entry={entry} />
        <Separator />
        <JournalLinesDetailTable lines={lines} />

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
