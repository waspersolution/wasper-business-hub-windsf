
import { Button } from "@/components/ui/button";
import { Layout, Plus } from "lucide-react";

export function CustomReportsTab() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
      <Layout className="h-16 w-16 text-muted-foreground" />
      <h3 className="text-lg font-semibold">Custom Report Builder</h3>
      <p className="text-muted-foreground max-w-md">
        Create your own custom reports by dragging and dropping fields, applying filters, and visualizing data your way.
      </p>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Create Custom Report
      </Button>
    </div>
  );
}
