import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { useJournalEntries } from "./hooks/useJournalEntries";
import { JournalEntriesHeader } from "./components/JournalEntriesHeader";
import { JournalEntriesSummary } from "./components/JournalEntriesSummary";
import { JournalEntriesFilters } from "./components/JournalEntriesFilters";
import { JournalEntriesTable } from "./components/JournalEntriesTable";
import { JournalEntryDialog } from "./components/JournalEntryDialog";
import { NewJournalEntryDialog } from "./components/NewJournalEntryDialog";
import { mockJournalEntries, mockJournalLines } from "./data/mockJournalData";

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
