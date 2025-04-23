
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JournalEntry } from "../JournalEntries";

interface JournalEntriesSummaryProps {
  journalEntries: JournalEntry[];
}

export function JournalEntriesSummary({ journalEntries }: JournalEntriesSummaryProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Posted</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {journalEntries.filter(e => e.status === "posted").length}
          </div>
          <p className="text-sm text-muted-foreground">
            Posted journal entries
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Draft Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-500">
            {journalEntries.filter(e => e.status === "draft").length}
          </div>
          <p className="text-sm text-muted-foreground">
            Pending journal entries
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-500">
            {journalEntries.length}
          </div>
          <p className="text-sm text-muted-foreground">
            Entries this month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
