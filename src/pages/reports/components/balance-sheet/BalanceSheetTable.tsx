
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetsSection } from "./table/AssetsSection";
import { LiabilitiesSection } from "./table/LiabilitiesSection";
import { EquitySection } from "./table/EquitySection";
import type { BalanceSheetItem } from "../../types/financial-reports";

interface BalanceSheetTableProps {
  assets: BalanceSheetItem[];
  liabilities: BalanceSheetItem[];
  equity: BalanceSheetItem[];
  searchTerm: string;
}

export function BalanceSheetTable({ assets, liabilities, equity, searchTerm }: BalanceSheetTableProps) {
  const filteredAssets = assets.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredLiabilities = liabilities.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredEquity = equity.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const totalLiabilities = filteredLiabilities.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="standard" className="w-full">
        <div className="px-6 border-b">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="detailed">Detailed</TabsTrigger>
            <TabsTrigger value="comparative">Comparative</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="standard" className="m-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead colSpan={2} className="text-lg font-bold">Assets</TableHead>
                  <TableHead className="text-right">Amount (₦)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AssetsSection assets={assets} filteredAssets={filteredAssets} />

                {/* Liabilities Header */}
                <TableRow className="bg-muted/30">
                  <TableHead colSpan={2} className="text-lg font-bold">Liabilities</TableHead>
                  <TableHead className="text-right">Amount (₦)</TableHead>
                </TableRow>

                <LiabilitiesSection 
                  liabilities={liabilities} 
                  filteredLiabilities={filteredLiabilities} 
                />

                {/* Equity Header */}
                <TableRow className="bg-muted/30">
                  <TableHead colSpan={2} className="text-lg font-bold">Equity</TableHead>
                  <TableHead className="text-right">Amount (₦)</TableHead>
                </TableRow>

                <EquitySection 
                  equity={equity} 
                  filteredEquity={filteredEquity}
                  totalLiabilities={totalLiabilities}
                />
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="detailed" className="m-0 p-6">
          <p className="text-muted-foreground">Detailed view shows all accounts with additional metrics such as percent change.</p>
        </TabsContent>
        
        <TabsContent value="comparative" className="m-0 p-6">
          <p className="text-muted-foreground">Comparative view shows side-by-side comparison with previous periods.</p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
