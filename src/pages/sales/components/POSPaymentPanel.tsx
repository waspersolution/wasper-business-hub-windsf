
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { DollarSign, Banknote, CreditCard, Wallet } from "lucide-react";

const paymentOptions = [
  { value: "cash", label: "Cash", icon: DollarSign },
  { value: "bank_transfer", label: "Transfer", icon: Banknote },
  { value: "pos", label: "POS", icon: Banknote },
  { value: "card", label: "Card", icon: CreditCard },
  { value: "credit", label: "Credit", icon: Banknote },
  { value: "wallet", label: "Wallet", icon: Wallet },
];

type PaymentRow = {
  method: string;
  amount: number | "";
  reference?: string;
};

interface POSPaymentPanelProps {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  totalDue: number;
  onSubmit?: (payments: PaymentRow[]) => void;
  customerName?: string;
}

export default function POSPaymentPanel({
  open, onOpenChange, totalDue, onSubmit, customerName
}: POSPaymentPanelProps) {
  const [payments, setPayments] = useState<PaymentRow[]>([
    { method: "cash", amount: totalDue }
  ]);

  // Update a payment row
  const updateRow = (idx: number, row: Partial<PaymentRow>) => {
    setPayments(old =>
      old.map((p, i) => i === idx ? { ...p, ...row } : p)
    );
  };

  // Add new row
  const addRow = () => {
    setPayments([...payments, { method: "", amount: "" }]);
  };

  // Remove a row
  const removeRow = (idx: number) => {
    setPayments(payments.filter((_, i) => i !== idx));
  };

  // Amount summing
  const totalPaid = payments.reduce((sum, p) => sum + (typeof p.amount === "number" ? p.amount : 0), 0);
  const balance = totalDue - totalPaid;
  const overpaid = totalPaid > totalDue ? totalPaid - totalDue : 0;

  const canSubmit =
    payments.every(
      p =>
        p.method &&
        (typeof p.amount === "number" && p.amount > 0) &&
        ["cash", "bank_transfer", "pos", "card", "credit", "wallet"].includes(p.method)
    ) &&
    totalPaid >= totalDue;

  const handleSubmit = () => {
    if (onSubmit) onSubmit(payments);
    onOpenChange(false);
    setPayments([{ method: "cash", amount: totalDue }]);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-lg mx-auto rounded-t-2xl p-0 shadow-lg">
        <DrawerHeader>
          <DrawerTitle>
            Select Payment Mode(s)
            <span className="block font-normal text-sm text-gray-400 mt-1">Cart Total: ₦{totalDue.toLocaleString()}</span>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" className="absolute right-3 top-3">×</Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="px-4 py-2">
          <div className="flex flex-col gap-3">
            {payments.map((row, idx) => (
              <div key={idx} className="flex gap-2 items-center rounded-lg border p-2 bg-white">
                <Select
                  value={row.method}
                  onValueChange={(v) => updateRow(idx, { method: v })}
                >
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value} className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-2">
                          <opt.icon className="h-4 w-4 inline" />
                          {opt.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  className="w-28"
                  placeholder="₦0"
                  type="number"
                  min={0}
                  value={row.amount}
                  onChange={e => updateRow(idx, { amount: e.target.value === "" ? "" : Number(e.target.value) })}
                />
                {/* Reference for relevant types */}
                {(row.method === "bank_transfer" || row.method === "pos" || row.method === "card") && (
                  <Input
                    className="w-28"
                    placeholder="Reference"
                    value={row.reference || ""}
                    onChange={e => updateRow(idx, { reference: e.target.value })}
                  />
                )}
                {payments.length > 1 && (
                  <Button variant="ghost" size="icon" onClick={() => removeRow(idx)}>
                    ×
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addRow} className="w-full flex gap-2 items-center" type="button">
              +
              Add Payment Method
            </Button>
            {/* Payment Summary */}
            <div className="rounded-lg bg-wasper-light p-3 mt-2 border">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total Paid:</span>
                <span className="font-semibold text-green-700">₦{totalPaid.toLocaleString()}</span>
              </div>
              {balance > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Balance Owed:</span>
                  <span>₦{balance.toLocaleString()}</span>
                </div>
              )}
              {overpaid > 0 && (
                <div className="flex justify-between text-sm text-blue-600">
                  <span>Overpaid:</span>
                  <span>₦{overpaid.toLocaleString()} (Credited to Account)</span>
                </div>
              )}
              {customerName && (
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Customer:</span>
                  <span>{customerName}</span>
                </div>
              )}
            </div>
            {/* Submit */}
            <Button onClick={handleSubmit} variant="success" disabled={!canSubmit} className="w-full mt-3">
              Submit Payment
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

