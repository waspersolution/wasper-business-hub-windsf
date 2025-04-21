
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ChevronDown } from "lucide-react";
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

const BANK_OPTIONS = [
  { label: "First Bank", value: "First Bank" },
  { label: "Access Bank", value: "Access Bank" },
  { label: "Zenith Bank", value: "Zenith Bank" },
  { label: "GTBank", value: "GTBank" },
];

interface AccountsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  accountType: string;
  onAccountTypeChange: (value: string) => void;
  currency: string;
  onCurrencyChange: (value: string) => void;
  selectedBanks: string[];
  onSelectedBanksChange: (banks: string[]) => void;
  onReset: () => void;
}

export function AccountsFilter({
  searchTerm,
  onSearchChange,
  accountType,
  onAccountTypeChange,
  currency,
  onCurrencyChange,
  selectedBanks,
  onSelectedBanksChange,
  onReset,
}: AccountsFilterProps) {
  const handleBankToggle = (bank: string) => {
    if (selectedBanks.includes(bank)) {
      onSelectedBanksChange(selectedBanks.filter(b => b !== bank));
    } else {
      onSelectedBanksChange([...selectedBanks, bank]);
    }
  };

  const allBanksSelected = BANK_OPTIONS.every(opt => selectedBanks.includes(opt.value));

  const handleAllBanksToggle = () => {
    if (allBanksSelected) {
      onSelectedBanksChange([]);
    } else {
      onSelectedBanksChange(BANK_OPTIONS.map(opt => opt.value));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Search & Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-full sm:w-1/3">
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
              prefix={<Search className="mr-2 h-4 w-4 text-muted-foreground" />}
            />
          </div>
          <div className="w-full sm:w-1/4">
            <Select value={accountType} onValueChange={onAccountTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="current">Current</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="domiciliary">Domiciliary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Banks</h4>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <input
                          id="filter-all-banks"
                          type="checkbox"
                          className="mr-2"
                          checked={allBanksSelected}
                          onChange={handleAllBanksToggle}
                        />
                        <label htmlFor="filter-all-banks">All Banks</label>
                      </div>
                      {BANK_OPTIONS.map((bank) => (
                        <div className="flex items-center" key={bank.value}>
                          <input
                            id={`filter-${bank.value}`}
                            type="checkbox"
                            className="mr-2"
                            checked={selectedBanks.includes(bank.value)}
                            onChange={() => handleBankToggle(bank.value)}
                          />
                          <label htmlFor={`filter-${bank.value}`}>{bank.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Currency</h4>
                    <Select value={currency} onValueChange={onCurrencyChange}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Currencies</SelectItem>
                        <SelectItem value="NGN">NGN</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={onReset}>Reset</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
