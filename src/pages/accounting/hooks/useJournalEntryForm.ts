
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface JournalLine {
  id: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}

export function useJournalEntryForm() {
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

  return {
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
  };
}
