
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ReportPageHeader } from "./components/ReportPageHeader";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { FinancialReportsCards } from "./components/FinancialReportsCards";
import { Download, Filter, Printer } from "lucide-react";

export default function FinancialReports() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground mt-1">
              View and analyze your company's financial performance
            </p>
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

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
        />

        <FinancialReportsCards />

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">Save as Favorite</Button>
          <Button variant="outline">Schedule Report</Button>
          <Button>Generate Detailed Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
