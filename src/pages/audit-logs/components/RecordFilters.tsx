
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Filter, Search, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const actionOptions = [
  { label: "All Actions", value: "all" },
  { label: "Create", value: "create" },
  { label: "Update", value: "update" },
  { label: "Delete", value: "delete" },
];

export const moduleOptions = [
  { label: "All Modules", value: "all" },
  { label: "Inventory", value: "inventory" },
  { label: "Sales", value: "sales" },
  { label: "Customers", value: "customers" },
  { label: "Users", value: "users" },
];

interface RecordFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedAction: string;
  setSelectedAction: (value: string) => void;
  selectedModule: string;
  setSelectedModule: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  isFiltersVisible: boolean;
  setIsFiltersVisible: (value: boolean) => void;
}

export function RecordFilters({
  searchTerm,
  setSearchTerm,
  selectedAction,
  setSelectedAction,
  selectedModule,
  setSelectedModule,
  date,
  setDate,
  isFiltersVisible,
  setIsFiltersVisible
}: RecordFiltersProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by entity name, ID, or user..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-10 gap-1"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <Filter className="h-4 w-4" />
          Filters
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isFiltersVisible ? "rotate-180" : ""
          )} />
        </Button>
      </div>
      
      {isFiltersVisible && (
        <Card className="p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Action</label>
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Module</label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent>
                  {moduleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedAction("all");
                  setSelectedModule("all");
                  setDate(undefined);
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
