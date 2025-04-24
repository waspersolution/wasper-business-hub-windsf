import { TableRow, TableCell } from "@/components/ui/table";
import type { BalanceSheetItem } from "../../../types/financial-reports";

interface AssetsSectionProps {
  assets: BalanceSheetItem[];
  filteredAssets: BalanceSheetItem[];
}

export function AssetsSection({ assets, filteredAssets }: AssetsSectionProps) {
  return (
    <>
      {/* Current Assets */}
      <TableRow className="bg-blue-50 dark:bg-blue-900/20">
        <TableCell colSpan={3} className="font-bold">Current Assets</TableCell>
      </TableRow>
      {filteredAssets
        .filter(item => item.category === "Current Assets")
        .map((item, index) => (
          <TableRow key={`asset-current-${index}`} className="hover:bg-muted/30">
            <TableCell></TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className="text-right font-mono">
              {item.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      <TableRow className="bg-muted/30 border-t">
        <TableCell></TableCell>
        <TableCell className="font-semibold">Total Current Assets</TableCell>
        <TableCell className="text-right font-mono font-semibold">
          {filteredAssets
            .filter(item => item.category === "Current Assets")
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>

      {/* Fixed Assets */}
      <TableRow className="bg-green-50 dark:bg-green-900/20">
        <TableCell colSpan={3} className="font-bold">Fixed Assets</TableCell>
      </TableRow>
      {filteredAssets
        .filter(item => item.category === "Fixed Assets")
        .map((item, index) => (
          <TableRow key={`asset-fixed-${index}`} className="hover:bg-muted/30">
            <TableCell></TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className="text-right font-mono">
              {item.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      <TableRow className="bg-muted/30 border-t">
        <TableCell></TableCell>
        <TableCell className="font-semibold">Total Fixed Assets</TableCell>
        <TableCell className="text-right font-mono font-semibold">
          {filteredAssets
            .filter(item => item.category === "Fixed Assets")
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>

      {/* Other Assets */}
      <TableRow className="bg-purple-50 dark:bg-purple-900/20">
        <TableCell colSpan={3} className="font-bold">Other Assets</TableCell>
      </TableRow>
      {filteredAssets
        .filter(item => item.category === "Other Assets")
        .map((item, index) => (
          <TableRow key={`asset-other-${index}`} className="hover:bg-muted/30">
            <TableCell></TableCell>
            <TableCell>{item.item}</TableCell>
            <TableCell className="text-right font-mono">
              {item.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      <TableRow className="bg-muted/30 border-t">
        <TableCell></TableCell>
        <TableCell className="font-semibold">Total Other Assets</TableCell>
        <TableCell className="text-right font-mono font-semibold">
          {filteredAssets
            .filter(item => item.category === "Other Assets")
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>

      {/* Total Assets */}
      <TableRow className="bg-blue-100 dark:bg-blue-800/40 font-bold">
        <TableCell></TableCell>
        <TableCell>TOTAL ASSETS</TableCell>
        <TableCell className="text-right font-mono">
          {filteredAssets
            .reduce((sum, item) => sum + item.amount, 0)
            .toLocaleString()}
        </TableCell>
      </TableRow>
    </>
  );
}
