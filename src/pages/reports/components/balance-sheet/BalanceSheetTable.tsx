import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BalanceSheetItem {
  category: string;
  item: string;
  amount: number;
}

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

                {/* Liabilities Header */}
                <TableRow className="bg-muted/30">
                  <TableHead colSpan={2} className="text-lg font-bold">Liabilities</TableHead>
                  <TableHead className="text-right">Amount (₦)</TableHead>
                </TableRow>

                {/* Current Liabilities */}
                <TableRow className="bg-red-50 dark:bg-red-900/20">
                  <TableCell colSpan={3} className="font-bold">Current Liabilities</TableCell>
                </TableRow>
                {filteredLiabilities
                  .filter(item => item.category === "Current Liabilities")
                  .map((item, index) => (
                    <TableRow key={`liability-current-${index}`} className="hover:bg-muted/30">
                      <TableCell></TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell className="text-right font-mono">
                        {item.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow className="bg-muted/30 border-t">
                  <TableCell></TableCell>
                  <TableCell className="font-semibold">Total Current Liabilities</TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {filteredLiabilities
                      .filter(item => item.category === "Current Liabilities")
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* Long-term Liabilities */}
                <TableRow className="bg-orange-50 dark:bg-orange-900/20">
                  <TableCell colSpan={3} className="font-bold">Long-term Liabilities</TableCell>
                </TableRow>
                {filteredLiabilities
                  .filter(item => item.category === "Long-term Liabilities")
                  .map((item, index) => (
                    <TableRow key={`liability-lt-${index}`} className="hover:bg-muted/30">
                      <TableCell></TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell className="text-right font-mono">
                        {item.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow className="bg-muted/30 border-t">
                  <TableCell></TableCell>
                  <TableCell className="font-semibold">Total Long-term Liabilities</TableCell>
                  <TableCell className="text-right font-mono font-semibold">
                    {filteredLiabilities
                      .filter(item => item.category === "Long-term Liabilities")
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* Total Liabilities */}
                <TableRow className="bg-red-100 dark:bg-red-800/40 font-bold">
                  <TableCell></TableCell>
                  <TableCell>TOTAL LIABILITIES</TableCell>
                  <TableCell className="text-right font-mono">
                    {filteredLiabilities
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* Equity Section */}
                <TableRow className="bg-muted/30">
                  <TableHead colSpan={2} className="text-lg font-bold">Equity</TableHead>
                  <TableHead className="text-right">Amount (₦)</TableHead>
                </TableRow>

                {filteredEquity.map((item, index) => (
                  <TableRow key={`equity-${index}`} className="hover:bg-muted/30">
                    <TableCell></TableCell>
                    <TableCell>{item.item}</TableCell>
                    <TableCell className="text-right font-mono">
                      {item.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}

                {/* Total Equity */}
                <TableRow className="bg-green-100 dark:bg-green-800/40 font-bold">
                  <TableCell></TableCell>
                  <TableCell>TOTAL EQUITY</TableCell>
                  <TableCell className="text-right font-mono">
                    {filteredEquity
                      .reduce((sum, item) => sum + item.amount, 0)
                      .toLocaleString()}
                  </TableCell>
                </TableRow>

                {/* Total Liabilities and Equity */}
                <TableRow className="bg-gray-200 dark:bg-gray-700 font-bold text-lg">
                  <TableCell></TableCell>
                  <TableCell>TOTAL LIABILITIES AND EQUITY</TableCell>
                  <TableCell className="text-right font-mono">
                    {(filteredLiabilities.reduce((sum, item) => sum + item.amount, 0) + 
                      filteredEquity.reduce((sum, item) => sum + item.amount, 0)).toLocaleString()}
                  </TableCell>
                </TableRow>
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
