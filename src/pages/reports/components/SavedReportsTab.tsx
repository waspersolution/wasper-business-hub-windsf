
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

export function SavedReportsTab() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
      <Save className="h-16 w-16 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Saved Reports</h3>
      <p className="text-muted-foreground max-w-md">
        You haven't saved any reports yet. Save reports for quick access to frequently used analytics.
      </p>
      <Button className="gap-2" variant="outline">
        <Plus className="h-4 w-4" />
        Browse Reports
      </Button>
    </div>
  );
}
