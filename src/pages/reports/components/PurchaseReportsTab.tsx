
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Plus, User } from "lucide-react";

export function PurchaseReportsTab() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purchase Reports</CardTitle>
              <CardDescription>Supplier and procurement analytics</CardDescription>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
              <a href="/reports/purchase-summary">
                <BarChart2 className="h-8 w-8 mb-2 text-blue-500" />
                <span className="font-medium">Purchase Summary</span>
                <span className="text-xs text-muted-foreground">Procurement overview</span>
              </a>
            </Button>
            <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
              <a href="/reports/supplier-purchases">
                <User className="h-8 w-8 mb-2 text-green-500" />
                <span className="font-medium">Supplier-wise Purchases</span>
                <span className="text-xs text-muted-foreground">Vendor analysis</span>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
