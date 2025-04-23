
import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface JournalLine {
  id: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}

interface NewJournalEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewJournalEntryDialog({ open, onOpenChange }: NewJournalEntryDialogProps) {
  const { toast } = useToast();
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<JournalLine[]>([
    { id: "1", account: "", description: "", debit: 0, credit: 0 },
    { id: "2", account: "", description: "", debit: 0, credit: 0 }
  ]);

  const addLine = () => {
    setLines([...lines, {
      id: (lines.length + 1).toString(),
      account: "",
      description: "",
      debit: 0,
      credit: 0
    }]);
  };

  const removeLine = (id: string) => {
    if (lines.length > 2) {
      setLines(lines.filter(line => line.id !== id));
    } else {
      toast({
        description: "Journal entry must have at least two lines",
        variant: "destructive"
      });
    }
  };

  const updateLine = (id: string, field: keyof JournalLine, value: string | number) => {
    setLines(lines.map(line => {
      if (line.id === id) {
        if (field === "debit" && Number(value) > 0) {
          return { ...line, [field]: Number(value), credit: 0 };
        }
        if (field === "credit" && Number(value) > 0) {
          return { ...line, [field]: Number(value), debit: 0 };
        }
        return { ...line, [field]: value };
      }
      return line;
    }));
  };

  const calculateTotals = useCallback(() => {
    return lines.reduce(
      (acc, line) => ({
        totalDebit: acc.totalDebit + (line.debit || 0),
        totalCredit: acc.totalCredit + (line.credit || 0)
      }),
      { totalDebit: 0, totalCredit: 0 }
    );
  }, [lines]);

  const { totalDebit, totalCredit } = calculateTotals();
  const difference = Math.abs(totalDebit - totalCredit);
  const isBalanced = difference === 0;

  const handleSubmit = () => {
    if (!isBalanced) {
      toast({
        description: "Journal entry must be balanced before posting",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
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
        <div className="grid gap-6 py-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="entry-date" className="text-sm font-medium">Date</label>
              <Input 
                id="entry-date" 
                type="date" 
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="entry-reference" className="text-sm font-medium">Reference (Optional)</label>
              <Input 
                id="entry-reference" 
                placeholder="e.g., INV-001 or Payment #123"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="entry-description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="entry-description" 
              placeholder="Enter a detailed description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Journal Lines</label>
              <Button variant="outline" size="sm" onClick={addLine}>
                <Plus className="h-4 w-4 mr-2" />
                Add Line
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ width: "30%" }}>Account</TableHead>
                    <TableHead style={{ width: "30%" }}>Description</TableHead>
                    <TableHead style={{ width: "15%" }} className="text-right">Debit</TableHead>
                    <TableHead style={{ width: "15%" }} className="text-right">Credit</TableHead>
                    <TableHead style={{ width: "10%" }}></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lines.map((line) => (
                    <TableRow key={line.id}>
                      <TableCell>
                        <Select 
                          value={line.account}
                          onValueChange={(value) => updateLine(line.id, "account", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000">1000 - Cash</SelectItem>
                            <SelectItem value="1010">1010 - Bank Account</SelectItem>
                            <SelectItem value="1200">1200 - Accounts Receivable</SelectItem>
                            <SelectItem value="2000">2000 - Accounts Payable</SelectItem>
                            <SelectItem value="4000">4000 - Sales Revenue</SelectItem>
                            <SelectItem value="5000">5000 - Cost of Goods Sold</SelectItem>
                            <SelectItem value="6000">6000 - Rent Expense</SelectItem>
                            <SelectItem value="6100">6100 - Utilities Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          placeholder="Line description"
                          value={line.description}
                          onChange={(e) => updateLine(line.id, "description", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          min="0"
                          placeholder="0.00"
                          className="text-right"
                          value={line.debit || ""}
                          onChange={(e) => updateLine(line.id, "debit", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          min="0"
                          placeholder="0.00"
                          className="text-right"
                          value={line.credit || ""}
                          onChange={(e) => updateLine(line.id, "credit", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => removeLine(line.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2} className="text-right font-medium">Total</TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      ₦{totalDebit.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono font-medium">
                      ₦{totalCredit.toLocaleString()}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="text-right font-medium">Difference</TableCell>
                    <TableCell 
                      colSpan={2} 
                      className={`text-center font-medium ${isBalanced ? 'text-green-600' : 'text-yellow-600'}`}
                    >
                      ₦{difference.toLocaleString()}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              * Total debits must equal total credits for the entry to be balanced
            </p>
          </div>
        </div>
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
