
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockJournals = [
  {
    id: "JE001",
    desc: "Opening balance",
    debit: 50000,
    credit: 0,
    created_at: "2025-04-15",
    entered_by: "Bukola Adebimpe",
  },
  {
    id: "JE002",
    desc: "Inventory purchase",
    debit: 0,
    credit: 37000,
    created_at: "2025-04-18",
    entered_by: "Chidi Okafor",
  },
];

export default function JournalEntries() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Journal Entries</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entry ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Debit</TableHead>
            <TableHead>Credit</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Entered By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockJournals.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.id}</TableCell>
              <TableCell>{entry.desc}</TableCell>
              <TableCell>₦{entry.debit.toLocaleString()}</TableCell>
              <TableCell>₦{entry.credit.toLocaleString()}</TableCell>
              <TableCell>{entry.created_at}</TableCell>
              <TableCell>{entry.entered_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
