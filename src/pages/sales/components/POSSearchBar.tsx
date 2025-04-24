
import { Search, Grid, List } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface POSSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function POSSearchBar({ 
  searchQuery, 
  onSearchChange, 
  viewMode, 
  onViewModeChange,
  onKeyDown,
  inputRef
}: POSSearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow p-3 flex gap-2 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Scan/Search products..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={onKeyDown}
          ref={inputRef}
          aria-label="Search or scan products"
        />
      </div>
      <Button 
        variant={viewMode === "grid" ? "default" : "outline"} 
        size="icon"
        onClick={() => onViewModeChange("grid")}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button 
        variant={viewMode === "list" ? "default" : "outline"} 
        size="icon"
        onClick={() => onViewModeChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
