
import { useState } from "react";
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

interface AccountsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function AccountsFilter({ searchTerm, onSearchChange }: AccountsFilterProps) {
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
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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
                        <input id="filter-all-banks" type="checkbox" className="mr-2" defaultChecked />
                        <label htmlFor="filter-all-banks">All Banks</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-first-bank" type="checkbox" className="mr-2" />
                        <label htmlFor="filter-first-bank">First Bank</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-access" type="checkbox" className="mr-2" />
                        <label htmlFor="filter-access">Access Bank</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-zenith" type="checkbox" className="mr-2" />
                        <label htmlFor="filter-zenith">Zenith Bank</label>
                      </div>
                      <div className="flex items-center">
                        <input id="filter-gtbank" type="checkbox" className="mr-2" />
                        <label htmlFor="filter-gtbank">GTBank</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Currency</h4>
                    <Select defaultValue="all">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Currencies</SelectItem>
                        <SelectItem value="ngn">NGN</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="gbp">GBP</SelectItem>
                      </SelectContent>
                    </Select>
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
      </CardContent>
    </Card>
  );
}
