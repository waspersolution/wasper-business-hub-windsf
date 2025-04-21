
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

interface NewJournalEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewJournalEntryDialog({ open, onOpenChange }: NewJournalEntryDialogProps) {
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
              <Input id="entry-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-2">
              <label htmlFor="entry-reference" className="text-sm font-medium">Reference (Optional)</label>
              <Input id="entry-reference" placeholder="e.g., INV-001 or Payment #123" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="entry-description" className="text-sm font-medium">Description</label>
            <Textarea id="entry-description" placeholder="Enter a detailed description" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Journal Lines</label>
              <Button variant="outline" size="sm">
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
                  <TableRow>
                    <TableCell>
                      <Select>
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
                      <Input placeholder="Line description" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="0" placeholder="0.00" className="text-right" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="0" placeholder="0.00" className="text-right" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Select>
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
                      <Input placeholder="Line description" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="0" placeholder="0.00" className="text-right" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" min="0" placeholder="0.00" className="text-right" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2} className="text-right font-medium">Total</TableCell>
                    <TableCell className="text-right font-mono font-medium">₦0.00</TableCell>
                    <TableCell className="text-right font-mono font-medium">₦0.00</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} className="text-right font-medium">Difference</TableCell>
                    <TableCell colSpan={2} className="text-center font-medium text-yellow-600">₦0.00</TableCell>
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
          <Button variant="outline">Save as Draft</Button>
          <Button>Create & Post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
