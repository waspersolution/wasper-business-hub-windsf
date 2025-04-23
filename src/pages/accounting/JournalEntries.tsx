import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { useJournalEntries } from "./hooks/useJournalEntries";
import { JournalEntriesHeader } from "./components/JournalEntriesHeader";
import { JournalEntriesSummary } from "./components/JournalEntriesSummary";
import { JournalEntriesFilters } from "./components/JournalEntriesFilters";
import { JournalEntriesTable } from "./components/JournalEntriesTable";
import { JournalEntryDialog } from "./components/JournalEntryDialog";
import { NewJournalEntryDialog } from "./components/NewJournalEntryDialog";
import { mockJournalEntries } from "./JournalEntries";

export type JournalEntry = {
  id: string;
  entry_number: string;
  date: string;
  description: string;
  total_amount: number;
  is_balanced: boolean;
  status: "draft" | "posted" | "reversed";
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type JournalLine = {
  id: string;
  entry_id: string;
  account_code: string;
  account_name: string;
  description?: string;
  debit: number;
  credit: number;
};

export const mockJournalLines: Record<string, JournalLine[]> = {
  "J001": [
    {
      id: "JL001",
      entry_id: "J001",
      account_code: "6000",
      account_name: "Rent Expense",
      description: "April 2025 Office Rent",
      debit: 50000,
      credit: 0
    },
    {
      id: "JL002",
      entry_id: "J001",
      account_code: "1000",
      account_name: "Cash",
      description: "April 2025 Office Rent",
      debit: 0,
      credit: 50000
    }
  ],
  "J002": [
    {
      id: "JL003",
      entry_id: "J002",
      account_code: "6200",
      account_name: "Office Supplies Expense",
      description: "Purchase of stationery",
      debit: 15000,
      credit: 0
    },
    {
      id: "JL004",
      entry_id: "J002",
      account_code: "1000",
      account_name: "Cash",
      description: "Purchase of stationery",
      debit: 0,
      credit: 15000
    }
  ],
  "J003": [
    {
      id: "JL005",
      entry_id: "J003",
      account_code: "6300",
      account_name: "Interest Expense",
      description: "Monthly loan interest payment",
      debit: 25000,
      credit: 0
    },
    {
      id: "JL006",
      entry_id: "J003",
      account_code: "1010",
      account_name: "Bank Account",
      description: "Monthly loan interest payment",
      debit: 0,
      credit: 25000
    }
  ],
  "J004": [
    {
      id: "JL007",
      entry_id: "J004",
      account_code: "6100",
      account_name: "Salary Expense",
      description: "Staff salary April 2025",
      debit: 350000,
      credit: 0
    },
    {
      id: "JL008",
      entry_id: "J004",
      account_code: "1010",
      account_name: "Bank Account",
      description: "Staff salary April 2025",
      debit: 0,
      credit: 350000
    }
  ],
  "J005": [
    {
      id: "JL009",
      entry_id: "J005",
      account_code: "1200",
      account_name: "Accounts Receivable",
      description: "Invoice #INV-452 correction",
      debit: 0,
      credit: 7500
    },
    {
      id: "JL010",
      entry_id: "J005",
      account_code: "4000",
      account_name: "Sales Revenue",
      description: "Invoice #INV-452 correction",
      debit: 7500,
      credit: 0
    }
  ]
};

export default function JournalEntries() {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedEntry,
    viewEntryDialog,
    setViewEntryDialog,
    newEntryDialog,
    setNewEntryDialog,
    filteredEntries,
    handleViewEntry
  } = useJournalEntries(mockJournalEntries);
  
  const getStatusColor = (status: "draft" | "posted" | "reversed") => {
    switch (status) {
      case "posted": return "success";
      case "draft": return "outline";
      case "reversed": return "warning";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <JournalEntriesHeader onNewEntry={() => setNewEntryDialog(true)} />
        <JournalEntriesSummary journalEntries={mockJournalEntries} />
        <JournalEntriesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <JournalEntriesTable
          journalEntries={filteredEntries}
          handleViewEntry={handleViewEntry}
          getStatusColor={getStatusColor}
        />
      </div>
      
      <JournalEntryDialog
        entry={selectedEntry}
        open={viewEntryDialog}
        onOpenChange={setViewEntryDialog}
      />
      
      <NewJournalEntryDialog
        open={newEntryDialog}
        onOpenChange={setNewEntryDialog}
      />
    </DashboardLayout>
  );
}
