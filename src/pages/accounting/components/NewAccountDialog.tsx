
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

interface NewAccountDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mockAccounts: Account[];
}

export function NewAccountDialog({ open, setOpen, mockAccounts }: NewAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
          <DialogDescription>
            Create a new account in your chart of accounts
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="account-code" className="text-sm font-medium">Account Code</label>
              <Input id="account-code" placeholder="e.g. 1000" />
            </div>
            <div className="space-y-2">
              <label htmlFor="account-name" className="text-sm font-medium">Account Name</label>
              <Input id="account-name" placeholder="e.g. Cash" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="account-type" className="text-sm font-medium">Account Type</label>
            <Select>
              <SelectTrigger id="account-type">
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
            <label htmlFor="account-subtype" className="text-sm font-medium">Subtype</label>
            <Select>
              <SelectTrigger id="account-subtype">
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
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Input id="description" placeholder="Brief description of this account" />
          </div>
          <div className="space-y-2">
            <label htmlFor="parent-account" className="text-sm font-medium">Parent Account (Optional)</label>
            <Select>
              <SelectTrigger id="parent-account">
                <SelectValue placeholder="Select parent account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None (Top Level)</SelectItem>
                {mockAccounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.code} - {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="active" />
            <label
              htmlFor="active"
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
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
