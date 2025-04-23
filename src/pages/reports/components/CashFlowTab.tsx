
import React from "react";
import { CashFlowTable } from "./tables/CashFlowTable";
import type { CashFlowItem } from "../types/financial-reports";

type CashFlowTabProps = {
  data: CashFlowItem[];
  period: string;
};

export function CashFlowTab({ data, period }: CashFlowTabProps) {
  return (
    <>
      <div className="p-4 border-b bg-muted/20">
        <h3 className="font-semibold text-lg">Cash Flow Statement</h3>
        <p className="text-sm text-muted-foreground">Period: {period}</p>
      </div>
      <CashFlowTable data={data} />
    </>
  );
}
