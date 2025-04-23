
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { JournalLine } from "../../JournalEntries";

interface JournalLinesDetailTableProps {
  lines: JournalLine[];
}

export function JournalLinesDetailTable({ lines }: JournalLinesDetailTableProps) {
  const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Code</TableHead>
            <TableHead>Account Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Debit</TableHead>
            <TableHead className="text-right">Credit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lines.map((line) => (
            <TableRow key={line.id}>
              <TableCell>{line.account_code}</TableCell>
              <TableCell>{line.account_name}</TableCell>
              <TableCell>{line.description}</TableCell>
              <TableCell className="text-right font-mono">
                {line.debit > 0 ? `₦${line.debit.toLocaleString()}` : ""}
              </TableCell>
              <TableCell className="text-right font-mono">
                {line.credit > 0 ? `₦${line.credit.toLocaleString()}` : ""}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-muted/50">
            <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
            <TableCell className="text-right font-mono font-medium">
              ₦{totalDebit.toLocaleString()}
            </TableCell>
            <TableCell className="text-right font-mono font-medium">
              ₦{totalCredit.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
