
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAccountDialog({ open, onOpenChange }: NewAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
          <DialogDescription>
            Enter the details for the new bank or cash account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="account-name" className="text-sm font-medium">Account Name</label>
              <Input id="account-name" placeholder="e.g. Main Operating Account" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="account-type" className="text-sm font-medium">Account Type</label>
              <Select>
                <SelectTrigger id="account-type">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="cash">Cash Account</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="bank-name" className="text-sm font-medium">Bank Name</label>
                <Input id="bank-name" placeholder="e.g. First Bank" />
              </div>
              <div className="space-y-2">
                <label htmlFor="account-number" className="text-sm font-medium">Account Number</label>
                <Input id="account-number" placeholder="e.g. 0123456789" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="bank-account-type" className="text-sm font-medium">Bank Account Type</label>
                <Select>
                  <SelectTrigger id="bank-account-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="domiciliary">Domiciliary</SelectItem>
                    <SelectItem value="fixed">Fixed Deposit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="currency" className="text-sm font-medium">Currency</label>
                <Select defaultValue="ngn">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngn">Nigerian Naira (NGN)</SelectItem>
                    <SelectItem value="usd">US Dollar (USD)</SelectItem>
                    <SelectItem value="eur">Euro (EUR)</SelectItem>
                    <SelectItem value="gbp">British Pound (GBP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="initial-balance" className="text-sm font-medium">Initial Balance</label>
              <Input 
                id="initial-balance" 
                type="number" 
                min="0" 
                step="0.01" 
                placeholder="0.00" 
                prefix={<span className="text-muted-foreground">₦</span>}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="balance-date" className="text-sm font-medium">Balance Date</label>
              <Input id="balance-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
