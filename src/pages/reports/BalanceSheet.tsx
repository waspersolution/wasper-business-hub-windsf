import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Calendar, Download, Filter, Printer, Search } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/ui/charts";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for balance sheet
const balanceSheetData = {
  assets: [
    { category: "Current Assets", item: "Cash", amount: 190000 },
    { category: "Current Assets", item: "Accounts Receivable", amount: 87500 },
    { category: "Current Assets", item: "Inventory", amount: 145000 },
    { category: "Current Assets", item: "Prepaid Expenses", amount: 12500 },
    { category: "Current Assets", item: "Other Current Assets", amount: 8500 },
    { category: "Fixed Assets", item: "Property & Equipment", amount: 325000 },
    { category: "Fixed Assets", item: "Less: Accumulated Depreciation", amount: -75000 },
    { category: "Fixed Assets", item: "Intangible Assets", amount: 120000 },
    { category: "Other Assets", item: "Long-term Investments", amount: 200000 },
    { category: "Other Assets", item: "Other Non-current Assets", amount: 15000 },
  ],
  liabilities: [
    { category: "Current Liabilities", item: "Accounts Payable", amount: 45000 },
    { category: "Current Liabilities", item: "Short-term Loans", amount: 75000 },
    { category: "Current Liabilities", item: "Current Portion of Long-term Debt", amount: 25000 },
    { category: "Current Liabilities", item: "Accrued Expenses", amount: 18500 },
    { category: "Current Liabilities", item: "Taxes Payable", amount: 32500 },
    { category: "Current Liabilities", item: "Deferred Revenue", amount: 22000 },
    { category: "Long-term Liabilities", item: "Long-term Debt", amount: 280000 },
    { category: "Long-term Liabilities", item: "Deferred Tax Liabilities", amount: 35000 },
    { category: "Long-term Liabilities", item: "Other Long-term Liabilities", amount: 17500 },
  ],
  equity: [
    { category: "Equity", item: "Common Stock", amount: 100000 },
    { category: "Equity", item: "Additional Paid-in Capital", amount: 150000 },
    { category: "Equity", item: "Retained Earnings", amount: 182000 },
    { category: "Equity", item: "Other Comprehensive Income", amount: 8500 },
  ]
};

// Monthly asset data for chart
const monthlyAssetData = [
  { month: "Jan", assets: 750000, liabilities: 510000, equity: 240000 },
  { month: "Feb", assets: 765000, liabilities: 520000, equity: 245000 },
  { month: "Mar", assets: 780000, liabilities: 525000, equity: 255000 },
  { month: "Apr", assets: 795000, liabilities: 530000, equity: 265000 },
  { month: "May", assets: 810000, liabilities: 535000, equity: 275000 },
  { month: "Jun", assets: 830000, liabilities: 540000, equity: 290000 },
];

export default function BalanceSheet() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [comparison, setComparison] = useState("previous-period");
  
  // Calculate totals
  const totalAssets = balanceSheetData.assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = balanceSheetData.liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.amount, 0);
  const liabilitiesAndEquity = totalLiabilities + totalEquity;
  
  // Filter data based on search term
  const filteredAssets = balanceSheetData.assets.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredLiabilities = balanceSheetData.liabilities.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredEquity = balanceSheetData.equity.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Balance Sheet</h1>
            <p className="text-muted-foreground mt-1">
              View your company's financial position
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-end">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <label className="text-sm font-medium mb-1 block">Period</label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025-04">April 2025</SelectItem>
                    <SelectItem value="2025-03">March 2025</SelectItem>
                    <SelectItem value="2025-02">February 2025</SelectItem>
                    <SelectItem value="2025-01">January 2025</SelectItem>
                    <SelectItem value="2024-12">December 2024</SelectItem>
                    <SelectItem value="2024-11">November 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-48">
                <label className="text-sm font-medium mb-1 block">Comparison</label>
                <Select value={comparison} onValueChange={setComparison}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select comparison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="previous-period">Previous Period</SelectItem>
                    <SelectItem value="previous-year">Previous Year</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="none">No Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <DatePickerWithRange className="w-full md:w-auto" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Sheet Content */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Balance Sheet Statement */}
          <Card className="lg:col-span-4 overflow-hidden">
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>
                As of {period === "2025-04" ? "April 30, 2025" : period}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
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
                        {/* Current Assets Section */}
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

                        {/* Fixed Assets Section */}
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

                        {/* Other Assets Section */}
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

                        {/* Current Liabilities Section */}
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

                        {/* Long-term Liabilities Section */}
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

                        {/* Equity Header */}
                        <TableRow className="bg-muted/30">
                          <TableHead colSpan={2} className="text-lg font-bold">Equity</TableHead>
                          <TableHead className="text-right">Amount (₦)</TableHead>
                        </TableRow>

                        {/* Equity Section */}
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
            </CardContent>
          </Card>

          {/* Summary Cards and Chart */}
          <div className="lg:col-span-3 space-y-4">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                      <p className="text-2xl font-bold">₦{totalAssets.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-blue-200 dark:bg-blue-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-blue-700 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Liabilities</p>
                      <p className="text-2xl font-bold">₦{totalLiabilities.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-red-200 dark:bg-red-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-red-700 dark:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 18V9.75H7.5V18"></path><path d="M4.5 13.5H9"></path><path d="M12.75 18V12.75H15.75V18"></path><path d="M12.75 12.75V9.75H18V12.75"></path></svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Equity</p>
                      <p className="text-2xl font-bold">₦{totalEquity.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-green-200 dark:bg-green-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-green-700 dark:text-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-muted-foreground">Balance Check:</div>
                    <div className={`font-medium ${Math.abs(totalAssets - liabilitiesAndEquity) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.abs(totalAssets - liabilitiesAndEquity) < 0.01 ? 'Balanced ✓' : 'Not Balanced ✗'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Assets and Liabilities Chart */}
            <Card>
              <CardHeader>
                <CardTitle>6-Month Trend</CardTitle>
                <CardDescription>Assets, Liabilities & Equity</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyAssetData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="assets" stroke="#4f46e5" strokeWidth={2} name="Assets" />
                    <Line type="monotone" dataKey="liabilities" stroke="#ef4444" strokeWidth={2} name="Liabilities" />
                    <Line type="monotone" dataKey="equity" stroke="#10b981" strokeWidth={2} name="Equity" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Financial Ratios */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Ratios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Ratio</span>
                    <span className="font-medium">
                      {(balanceSheetData.assets
                        .filter(item => item.category === "Current Assets")
                        .reduce((sum, item) => sum + item.amount, 0) / 
                        balanceSheetData.liabilities
                        .filter(item => item.category === "Current Liabilities")
                        .reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Debt to Equity</span>
                    <span className="font-medium">
                      {(totalLiabilities / totalEquity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Debt to Assets</span>
                    <span className="font-medium">
                      {(totalLiabilities / totalAssets).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Export/Actions Area */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline">Save as Favorite</Button>
          <Button variant="outline">Schedule Report</Button>
          <Button>Generate Detailed Report</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
