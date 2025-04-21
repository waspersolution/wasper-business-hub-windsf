
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Calendar, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  ChevronDown
} from "lucide-react";
import React from "react";

type SalesFiltersProps = {
  searchTerm: string;
  onSearchTermChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
};

export function SalesFilters({
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusFilterChange,
}: SalesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="w-full sm:w-1/3">
        <Input
          placeholder="Search by customer or ID..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full"
          prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="w-full sm:w-1/4">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 ml-auto">
        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Date Range</h4>
                <div className="flex gap-2">
                  <Input type="date" className="w-full" placeholder="From" />
                  <Input type="date" className="w-full" placeholder="To" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Payment Method</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Payment Methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Amount Range</h4>
                <div className="flex gap-2">
                  <Input type="number" className="w-full" placeholder="Min" />
                  <Input type="number" className="w-full" placeholder="Max" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Reset</Button>
                <Button size="sm">Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
