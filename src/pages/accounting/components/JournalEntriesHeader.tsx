
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JournalEntriesHeaderProps {
  onNewEntry: () => void;
}

export function JournalEntriesHeader({ onNewEntry }: JournalEntriesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Journal Entries</h1>
        <p className="text-muted-foreground">Manage and track all accounting entries</p>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        
        <Button onClick={onNewEntry}>
          <Plus className="mr-2 h-4 w-4" />
          New Journal Entry
        </Button>
      </div>
    </div>
  );
}
