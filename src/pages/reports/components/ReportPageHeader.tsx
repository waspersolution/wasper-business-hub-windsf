
import { Button } from "@/components/ui/button";
import { Download, Filter, Printer } from "lucide-react";

type ReportPageHeaderProps = {
  title: string;
  description: string;
};

export function ReportPageHeader({ title, description }: ReportPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button>
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}
