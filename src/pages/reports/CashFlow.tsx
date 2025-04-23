
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

// Mock data for cash flow report
const cashFlowData = [
  { category: "Operating Activities", item: "Net Income", amount: 48500 },
  { category: "Operating Activities", item: "Depreciation", amount: 12500 },
  { category: "Operating Activities", item: "Increase in Accounts Receivable", amount: -15000 },
  { category: "Operating Activities", item: "Decrease in Inventory", amount: 8000 },
  { category: "Operating Activities", item: "Increase in Accounts Payable", amount: 12500 },
  { category: "Operating Activities", item: "Net Cash from Operating Activities", amount: 66500, isTotal: true },
  { category: "Investing Activities", item: "Purchase of Equipment", amount: -35000 },
  { category: "Investing Activities", item: "Sale of Investments", amount: 10000 },
  { category: "Investing Activities", item: "Net Cash used in Investing Activities", amount: -25000, isTotal: true },
  { category: "Financing Activities", item: "Loan Repayments", amount: -15000 },
  { category: "Financing Activities", item: "Dividends Paid", amount: -10000 },
  { category: "Financing Activities", item: "Net Cash used in Financing Activities", amount: -25000, isTotal: true },
  { category: "", item: "Net Increase in Cash", amount: 16500, isGrandTotal: true },
  { category: "", item: "Cash at Beginning of Period", amount: 173500, isInfo: true },
  { category: "", item: "Cash at End of Period", amount: 190000, isInfo: true },
];

// Monthly cash flow data for chart
const monthlyCashFlowData = [
  { 
    month: "Jan", 
    operating: 62000, 
    investing: -22000, 
    financing: -18000, 
    netCashFlow: 22000 
  },
  { 
    month: "Feb", 
    operating: 64500, 
    investing: -24000, 
    financing: -20000, 
    netCashFlow: 20500 
  },
  { 
    month: "Mar", 
    operating: 68000, 
    investing: -26000, 
    financing: -22000, 
    netCashFlow: 20000 
  },
  { 
    month: "Apr", 
    operating: 66500, 
    investing: -25000, 
    financing: -25000, 
    netCashFlow: 16500 
  },
  { 
    month: "May", 
    operating: 70000, 
    investing: -28000, 
    financing: -23000, 
    netCashFlow: 19000 
  },
  { 
    month: "Jun", 
    operating: 72000, 
    investing: -30000, 
    financing: -20000, 
    netCashFlow: 22000 
  },
];

export default function CashFlow() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [cashFlowType, setCashFlowType] = useState("direct");
  
  // Filter cash flow data based on search
  const filteredCashFlowData = cashFlowData.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
    
  // Calculate totals by category
  const getTotalByCategoryType = (category: string) => {
    return filteredCashFlowData
      .filter(item => item.category === category && !item.isTotal)
      .reduce((acc, item) => acc + item.amount, 0);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Cash Flow Statement</h1>
            <p className="text-muted-foreground mt-1">
              Analyze your company's cash inflows and outflows
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
                    placeholder="Search items..."
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
                <label className="text-sm font-medium mb-1 block">Method</label>
                <Select value={cashFlowType} onValueChange={setCashFlowType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct Method</SelectItem>
                    <SelectItem value="indirect">Indirect Method</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <DatePickerWithRange className="w-full md:w-auto" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* Cash Flow Statement */}
          <Card className="lg:col-span-4 overflow-hidden">
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>
                For the period ending {period === "2025-04" ? "April 30, 2025" : period}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
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
                    {/* Operating Activities */}
                    <TableRow className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                      <TableCell colSpan={3}>Operating Activities</TableCell>
                    </TableRow>
                    {filteredCashFlowData
                      .filter(item => item.category === "Operating Activities" && !item.isTotal)
                      .map((item, index) => (
                        <TableRow key={`op-${index}`} className="hover:bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell>{item.item}</TableCell>
                          <TableCell className={`text-right font-mono ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    {/* Operating Total */}
                    {filteredCashFlowData
                      .filter(item => item.category === "Operating Activities" && item.isTotal)
                      .map((item, index) => (
                        <TableRow key={`op-total-${index}`} className="bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell className="font-semibold">{item.item}</TableCell>
                          <TableCell className={`text-right font-mono font-semibold ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* Investing Activities */}
                    <TableRow className="bg-green-50 dark:bg-green-900/20 font-bold">
                      <TableCell colSpan={3}>Investing Activities</TableCell>
                    </TableRow>
                    {filteredCashFlowData
                      .filter(item => item.category === "Investing Activities" && !item.isTotal)
                      .map((item, index) => (
                        <TableRow key={`inv-${index}`} className="hover:bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell>{item.item}</TableCell>
                          <TableCell className={`text-right font-mono ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    {/* Investing Total */}
                    {filteredCashFlowData
                      .filter(item => item.category === "Investing Activities" && item.isTotal)
                      .map((item, index) => (
                        <TableRow key={`inv-total-${index}`} className="bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell className="font-semibold">{item.item}</TableCell>
                          <TableCell className={`text-right font-mono font-semibold ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* Financing Activities */}
                    <TableRow className="bg-purple-50 dark:bg-purple-900/20 font-bold">
                      <TableCell colSpan={3}>Financing Activities</TableCell>
                    </TableRow>
                    {filteredCashFlowData
                      .filter(item => item.category === "Financing Activities" && !item.isTotal)
                      .map((item, index) => (
                        <TableRow key={`fin-${index}`} className="hover:bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell>{item.item}</TableCell>
                          <TableCell className={`text-right font-mono ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    {/* Financing Total */}
                    {filteredCashFlowData
                      .filter(item => item.category === "Financing Activities" && item.isTotal)
                      .map((item, index) => (
                        <TableRow key={`fin-total-${index}`} className="bg-muted/30">
                          <TableCell></TableCell>
                          <TableCell className="font-semibold">{item.item}</TableCell>
                          <TableCell className={`text-right font-mono font-semibold ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}

                    {/* Net Change and Ending Balance */}
                    {filteredCashFlowData
                      .filter(item => item.isGrandTotal)
                      .map((item, index) => (
                        <TableRow key={`total-${index}`} className="bg-gray-100 dark:bg-gray-800">
                          <TableCell></TableCell>
                          <TableCell className="font-bold">{item.item}</TableCell>
                          <TableCell className={`text-right font-mono font-bold ${item.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {item.amount < 0 ? `(${Math.abs(item.amount).toLocaleString()})` : item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    
                    {/* Cash Balances */}
                    {filteredCashFlowData
                      .filter(item => item.isInfo)
                      .map((item, index) => (
                        <TableRow key={`info-${index}`} className="bg-muted/10">
                          <TableCell></TableCell>
                          <TableCell>{item.item}</TableCell>
                          <TableCell className="text-right font-mono">
                            {item.amount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Cash Flow Chart & Summary */}
          <div className="lg:col-span-3 space-y-4">
            {/* Summary Cards */}
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Operating Cash Flow</p>
                      <p className="text-2xl font-bold">₦{getTotalByCategoryType("Operating Activities").toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-blue-200 dark:bg-blue-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-blue-700 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path></svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Investing Cash Flow</p>
                      <p className="text-2xl font-bold">₦{Math.abs(getTotalByCategoryType("Investing Activities")).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-green-200 dark:bg-green-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-green-700 dark:text-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.2 20h15.6V4.2H4.2V20Z"></path><path d="M16 9h1"></path><path d="M12 9h1"></path><path d="M8 9h1"></path><path d="M16 13h1"></path><path d="M12 13h1"></path><path d="M8 13h1"></path><path d="M16 17h1"></path><path d="M12 17h1"></path><path d="M8 17h1"></path></svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Financing Cash Flow</p>
                      <p className="text-2xl font-bold">₦{Math.abs(getTotalByCategoryType("Financing Activities")).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-purple-200 dark:bg-purple-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-purple-700 dark:text-purple-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="m17 5-5-3-5 3"></path><path d="M19 15v6"></path><path d="M19 18h-7"></path><path d="M5 15v6"></path><path d="M5 9v6"></path><path d="M19 9v6"></path><path d="M12 19v3"></path><path d="m12 12-7-4"></path><path d="m12 12 7-4"></path></svg>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-200 dark:border-amber-800">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Net Cash Flow</p>
                      <p className="text-2xl font-bold">₦{filteredCashFlowData.find(item => item.isGrandTotal)?.amount.toLocaleString() || 0}</p>
                    </div>
                    <div className="flex items-center bg-amber-200 dark:bg-amber-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-amber-700 dark:text-amber-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Cash Flow Chart */}
            <Card>
              <CardHeader>
                <CardTitle>6-Month Cash Flow Trend</CardTitle>
                <CardDescription>Monthly breakdown by activity type</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyCashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₦${value < 0 ? '(' + Math.abs(value).toLocaleString() + ')' : value.toLocaleString()}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="operating" stroke="#4f46e5" strokeWidth={2} name="Operating" />
                    <Line type="monotone" dataKey="investing" stroke="#10b981" strokeWidth={2} name="Investing" />
                    <Line type="monotone" dataKey="financing" stroke="#8b5cf6" strokeWidth={2} name="Financing" />
                    <Line type="monotone" dataKey="netCashFlow" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Net Cash Flow" />
                  </LineChart>
                </ResponsiveContainer>
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
