
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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account } from "@/types/accounting";

interface EditAccountDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedAccount: Account | null;
}

export function EditAccountDialog({ open, setOpen, selectedAccount }: EditAccountDialogProps) {
  if (!selectedAccount) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Modify the account details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="edit-account-code" className="text-sm font-medium">Account Code</label>
              <Input id="edit-account-code" defaultValue={selectedAccount.code} />
            </div>
            <div className="space-y-2">
              <label htmlFor="edit-account-name" className="text-sm font-medium">Account Name</label>
              <Input id="edit-account-name" defaultValue={selectedAccount.name} />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-account-type" className="text-sm font-medium">Account Type</label>
            <Select defaultValue={selectedAccount.type}>
              <SelectTrigger id="edit-account-type">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asset">Asset</SelectItem>
                <SelectItem value="liability">Liability</SelectItem>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-account-subtype" className="text-sm font-medium">Subtype</label>
            <Select defaultValue={selectedAccount.subtype.toLowerCase().replace(" ", "-")}>
              <SelectTrigger id="edit-account-subtype">
                <SelectValue placeholder="Select subtype" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-asset">Current Asset</SelectItem>
                <SelectItem value="fixed-asset">Fixed Asset</SelectItem>
                <SelectItem value="current-liability">Current Liability</SelectItem>
                <SelectItem value="long-term-liability">Long-term Liability</SelectItem>
                <SelectItem value="equity">Equity</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="direct-cost">Direct Cost</SelectItem>
                <SelectItem value="operating-expense">Operating Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-description" className="text-sm font-medium">Description</label>
            <Input id="edit-description" defaultValue={selectedAccount.description} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="edit-active" defaultChecked={selectedAccount.active} />
            <label
              htmlFor="edit-active"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
