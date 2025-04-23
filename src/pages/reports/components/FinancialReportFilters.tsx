
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type FinancialReportFiltersProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  accountType?: string;
  setAccountType?: (value: string) => void;
};

export function FinancialReportFilters({
  searchTerm,
  setSearchTerm,
  period,
  setPeriod,
  accountType,
  setAccountType,
}: FinancialReportFiltersProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Search</label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-48">
            <label className="text-sm font-medium mb-1 block">Period</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-04">April 2025</SelectItem>
                <SelectItem value="2025-03">March 2025</SelectItem>
                <SelectItem value="2025-02">February 2025</SelectItem>
                <SelectItem value="2025-01">January 2025</SelectItem>
                <SelectItem value="2024-12">December 2024</SelectItem>
                <SelectItem value="2024-11">November 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {setAccountType && (
            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-1 block">Account Type</label>
              <Select value={accountType} onValueChange={setAccountType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="asset">Asset</SelectItem>
                  <SelectItem value="liability">Liability</SelectItem>
                  <SelectItem value="equity">Equity</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="w-full md:w-auto">
            <Button>
              <Filter className="w-4 h-4 mr-2" />
              Custom Range
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
