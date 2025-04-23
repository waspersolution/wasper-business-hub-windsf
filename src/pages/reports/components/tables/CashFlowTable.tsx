
import React from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import type { CashFlowItem } from "../../types/financial-reports";

type CashFlowTableProps = {
  data: CashFlowItem[];
};

export function CashFlowTable({ data }: CashFlowTableProps) {
  const renderSection = (category: string) => {
    const items = data.filter(item => item.category === category);
    const regularItems = items.filter(item => !item.isTotal);
    const totalItem = items.find(item => item.isTotal);

    return (
      <>
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
          {renderSection("Operating Activities")}
          {renderSection("Investing Activities")}
          {renderSection("Financing Activities")}
          
          {/* Totals and Info */}
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
  );
}
