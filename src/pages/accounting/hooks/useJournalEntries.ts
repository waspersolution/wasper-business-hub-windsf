
import { useState } from "react";
import { JournalEntry } from "../JournalEntries";

export function useJournalEntries(journalEntries: JournalEntry[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [viewEntryDialog, setViewEntryDialog] = useState(false);
  const [newEntryDialog, setNewEntryDialog] = useState(false);
  
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = 
      entry.entry_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setViewEntryDialog(true);
  };

  return {
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
  };
}
