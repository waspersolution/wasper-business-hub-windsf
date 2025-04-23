
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { JournalLine } from "../../hooks/useJournalEntryForm";

interface JournalLinesTableProps {
  lines: JournalLine[];
  onAddLine: () => void;
  onRemoveLine: (id: string) => void;
  onUpdateLine: (id: string, field: keyof JournalLine, value: string | number) => void;
  totalDebit: number;
  totalCredit: number;
}

export function JournalLinesTable({
  lines,
  onAddLine,
  onRemoveLine,
  onUpdateLine,
  totalDebit,
  totalCredit
}: JournalLinesTableProps) {
  const difference = Math.abs(totalDebit - totalCredit);
  const isBalanced = difference === 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium">Journal Lines</label>
        <Button variant="outline" size="sm" onClick={onAddLine}>
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
                    onValueChange={(value) => onUpdateLine(line.id, "account", value)}
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
                    onChange={(e) => onUpdateLine(line.id, "description", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    min="0"
                    placeholder="0.00"
                    className="text-right"
                    value={line.debit || ""}
                    onChange={(e) => onUpdateLine(line.id, "debit", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    min="0"
                    placeholder="0.00"
                    className="text-right"
                    value={line.credit || ""}
                    onChange={(e) => onUpdateLine(line.id, "credit", e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onRemoveLine(line.id)}
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
  );
}
