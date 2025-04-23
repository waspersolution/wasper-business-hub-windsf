
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useJournalEntryForm } from "../hooks/useJournalEntryForm";
import { EntryDetailsForm } from "./journal-entries/EntryDetailsForm";
import { JournalLinesTable } from "./journal-entries/JournalLinesTable";

interface NewJournalEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewJournalEntryDialog({ open, onOpenChange }: NewJournalEntryDialogProps) {
  const { toast } = useToast();
  const {
    entryDate,
    setEntryDate,
    reference,
    setReference,
    description,
    setDescription,
    lines,
    addLine,
    removeLine,
    updateLine,
    calculateTotals
  } = useJournalEntryForm();

  const { totalDebit, totalCredit } = calculateTotals();
  const isBalanced = totalDebit === totalCredit;

  const handleSubmit = () => {
    if (!isBalanced) {
      toast({
        description: "Journal entry must be balanced before posting",
        variant: "destructive"
      });
      return;
    }

    if (!entryDate || !description || lines.some(line => !line.account)) {
      toast({
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // TODO: Handle journal entry submission
    console.log("Submitting balanced journal entry:", {
      date: entryDate,
      reference,
      description,
      lines
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>New Journal Entry</DialogTitle>
          <DialogDescription>
            Create a new manual journal entry
          </DialogDescription>
        </DialogHeader>

        <EntryDetailsForm
          entryDate={entryDate}
          reference={reference}
          description={description}
          onDateChange={setEntryDate}
          onReferenceChange={setReference}
          onDescriptionChange={setDescription}
        />

        <JournalLinesTable
          lines={lines}
          onAddLine={addLine}
          onRemoveLine={removeLine}
          onUpdateLine={updateLine}
          totalDebit={totalDebit}
          totalCredit={totalCredit}
        />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            variant="outline" 
            disabled={!isBalanced || !description || !entryDate}
          >
            Save as Draft
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isBalanced || !description || !entryDate}
          >
            Create & Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
