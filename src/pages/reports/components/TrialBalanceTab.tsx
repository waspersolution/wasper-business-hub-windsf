
import React from "react";
import { TrialBalanceTable } from "./tables/TrialBalanceTable";
import type { TrialBalanceItem } from "../types/financial-reports";

type TrialBalanceTabProps = {
  data: TrialBalanceItem[];
  period: string;
};

export function TrialBalanceTab({ data, period }: TrialBalanceTabProps) {
  return (
    <>
      <div className="p-4 border-b bg-muted/20">
        <h3 className="font-semibold text-lg">Trial Balance</h3>
        <p className="text-sm text-muted-foreground">Period: {period}</p>
      </div>
      <TrialBalanceTable data={data} />
    </>
  );
}
