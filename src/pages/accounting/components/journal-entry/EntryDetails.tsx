
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { JournalEntry } from "../../JournalEntries";

interface EntryDetailsProps {
  entry: JournalEntry;
}

export function EntryDetails({ entry }: EntryDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Date</div>
          <div className="font-medium">{entry.date}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Status</div>
          <div>
            <Badge
              variant={
                entry.status === "posted"
                  ? "success"
                  : entry.status === "draft"
                  ? "outline"
                  : "warning"
              }
            >
              {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Total Amount</div>
          <div className="font-medium">₦{entry.total_amount.toLocaleString()}</div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Description</div>
        <div className="font-medium">{entry.description}</div>
      </div>
    </div>
  );
}
