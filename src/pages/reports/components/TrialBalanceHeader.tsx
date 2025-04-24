
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Printer } from 'lucide-react';

interface TrialBalanceHeaderProps {
  period: string;
}

export function TrialBalanceHeader({ period }: TrialBalanceHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Trial Balance</CardTitle>
          <CardDescription>
            For the period ending {period === "2025-04" ? "April 30, 2025" : period}
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {}}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </CardHeader>
  );
}

