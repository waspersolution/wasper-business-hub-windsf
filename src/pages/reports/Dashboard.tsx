
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FinancialReportFilters } from "./components/FinancialReportFilters";
import { ReportsDashboardHeader } from "./components/ReportsDashboardHeader";
import { SalesReportsTab } from "./components/SalesReportsTab";
import { StockReportsTab } from "./components/StockReportsTab";
import { PurchaseReportsTab } from "./components/PurchaseReportsTab";
import { AccountingReportsTab } from "./components/AccountingReportsTab";
import { CustomReportsTab } from "./components/CustomReportsTab";
import { SavedReportsTab } from "./components/SavedReportsTab";

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("all");

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ReportsDashboardHeader />

        <FinancialReportFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          period={period}
          setPeriod={setPeriod}
          accountType={accountType}
          setAccountType={setAccountType}
        />

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none px-0 mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Sales Reports
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Stock Reports
            </TabsTrigger>
            <TabsTrigger value="purchase" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Purchase Reports
            </TabsTrigger>
            <TabsTrigger value="accounting" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Accounting Reports
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Custom
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-0">
            <SalesReportsTab />
          </TabsContent>

          <TabsContent value="stock" className="mt-0">
            <StockReportsTab />
          </TabsContent>

          <TabsContent value="purchase" className="mt-0">
            <PurchaseReportsTab />
          </TabsContent>

          <TabsContent value="accounting" className="mt-0">
            <AccountingReportsTab />
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <CustomReportsTab />
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <SavedReportsTab />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">Save as Favorite</Button>
          <Button variant="outline">Schedule Report</Button>
          <Button>Generate Detailed Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
