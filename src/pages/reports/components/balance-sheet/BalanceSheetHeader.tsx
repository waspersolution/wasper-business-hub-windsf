
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BalanceSheetHeaderProps {
  period: string;
  setPeriod: (value: string) => void;
  comparison: string;
  setComparison: (value: string) => void;
}

export function BalanceSheetHeader({ period, setPeriod, comparison, setComparison }: BalanceSheetHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Sheet</CardTitle>
        <CardDescription>
          As of {period === "2025-04" ? "April 30, 2025" : period}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-04">April 2025</SelectItem>
              <SelectItem value="2025-03">March 2025</SelectItem>
              <SelectItem value="2025-02">February 2025</SelectItem>
            </SelectContent>
          </Select>
          <Select value={comparison} onValueChange={setComparison}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Compare with" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous-period">Previous Period</SelectItem>
              <SelectItem value="same-period-last-year">Same Period Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
