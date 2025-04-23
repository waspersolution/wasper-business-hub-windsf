
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

type CashFlowItem = {
  category: string;
  item: string;
  amount: number;
  isTotal?: boolean;
  isGrandTotal?: boolean;
  isInfo?: boolean;
};

type CashFlowTabProps = {
  data: CashFlowItem[];
  period: string;
};

export function CashFlowTab({ data, period }: CashFlowTabProps) {
  const renderCashFlowSection = (category: string, items: CashFlowItem[]) => {
    const regularItems = items.filter(item => !item.isTotal);
    const totalItem = items.find(item => item.isTotal);

    return (
      <>
        <TableRow className={`
          ${category === "Operating Activities" ? "bg-blue-50 dark:bg-blue-900/20" : ""}
          ${category === "Investing Activities" ? "bg-green-50 dark:bg-green-900/20" : ""}
          ${category === "Financing Activities" ? "bg-purple-50 dark:bg-purple-900/20" : ""}
          font-bold
        `}>
          <TableCell colSpan={3}>{category}</TableCell>
        </TableRow>
        {regularItems.map((item, index) => (
          <TableRow key={`${category}-${index}`} className="hover:bg-muted/30">
            <TableCell></TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className={`text-right font-mono ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
        {totalItem && (
          <TableRow className="bg-muted/30">
            <TableCell></TableCell>
            <TableCell className="font-semibold">{totalItem.item}</TableCell>
            <TableCell className={`text-right font-mono font-semibold ${totalItem.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {totalItem.amount < 0 ? `(${Math.abs(totalItem.amount).toLocaleString()})` : totalItem.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };

  return (
    <>
      <div className="p-4 border-b bg-muted/20">
        <h3 className="font-semibold text-lg">Cash Flow Statement</h3>
        <p className="text-sm text-muted-foreground">Period: {period}</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Amount (₦)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderCashFlowSection("Operating Activities", data.filter(item => item.category === "Operating Activities"))}
            {renderCashFlowSection("Investing Activities", data.filter(item => item.category === "Investing Activities"))}
            {renderCashFlowSection("Financing Activities", data.filter(item => item.category === "Financing Activities"))}

            {/* Net Change and Ending Balance */}
            {data
              .filter(item => item.isGrandTotal || item.isInfo)
              .map((item, index) => (
                <TableRow 
                  key={`summary-${index}`} 
                  className={item.isGrandTotal ? "bg-gray-100 dark:bg-gray-800" : "bg-muted/10"}
                >
                  <TableCell></TableCell>
                  <TableCell className={item.isGrandTotal ? "font-bold" : ""}>{item.item}</TableCell>
                  <TableCell className={`text-right font-mono ${item.isGrandTotal ? "font-bold" : ""} ${item.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                    {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
