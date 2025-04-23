
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

// Mock data for profit and loss
const profitLossData = [
  { category: "Revenue", item: "Sales Revenue", amount: 320000 },
  { category: "Revenue", item: "Service Revenue", amount: 85000 },
  { category: "Revenue", item: "Interest Income", amount: 2500 },
  { category: "Expenses", item: "Cost of Goods Sold", amount: -192000 },
  { category: "Expenses", item: "Salaries Expense", amount: -78000 },
  { category: "Expenses", item: "Rent Expense", amount: -25000 },
  { category: "Expenses", item: "Utilities Expense", amount: -15000 },
  { category: "Expenses", item: "Office Supplies", amount: -10000 },
  { category: "Expenses", item: "Depreciation", amount: -12500 },
  { category: "Expenses", item: "Marketing Expense", amount: -18000 },
  { category: "Expenses", item: "Insurance", amount: -8500 },
];

// Monthly profit data for chart
const monthlyProfitData = [
  { month: "Jan", revenue: 280000, expenses: 232000, profit: 48000 },
  { month: "Feb", revenue: 290000, expenses: 235000, profit: 55000 },
  { month: "Mar", revenue: 310000, expenses: 245000, profit: 65000 },
  { month: "Apr", revenue: 320000, expenses: 258000, profit: 62000 },
  { month: "May", revenue: 350000, expenses: 275000, profit: 75000 },
  { month: "Jun", revenue: 380000, expenses: 290000, profit: 90000 },
];

export default function ProfitLoss() {
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [comparison, setComparison] = useState("previous-period");
  
  // Filter data based on search
  const filteredProfitLoss = profitLossData.filter(item => 
    item.item.toLowerCase().includes(searchTerm.toLowerCase()));
  
  // Calculate totals
  const totalRevenue = filteredProfitLoss
    .filter(item => item.category === "Revenue")
    .reduce((sum, item) => sum + item.amount, 0);
    
  const totalExpenses = filteredProfitLoss
    .filter(item => item.category === "Expenses")
    .reduce((sum, item) => sum + item.amount, 0);
    
  const netProfit = totalRevenue + totalExpenses; // expenses are negative
  
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profit & Loss Statement</h1>
            <p className="text-muted-foreground mt-1">
              Analyze your company's financial performance
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

        {/* P&L Content */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {/* P&L Statement */}
          <Card className="lg:col-span-4 overflow-hidden">
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>
                For the period ending {period === "2025-04" ? "April 30, 2025" : period}
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
                          <TableHead>Category</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead className="text-right">Amount (₦)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Revenue Section */}
                        <TableRow className="bg-blue-50 dark:bg-blue-900/20">
                          <TableCell colSpan={3} className="font-bold">Revenue</TableCell>
                        </TableRow>
                        {filteredProfitLoss
                          .filter(item => item.category === "Revenue")
                          .map((item, index) => (
                            <TableRow key={`revenue-${index}`} className="hover:bg-muted/30">
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.item}</TableCell>
                              <TableCell className="text-right font-mono text-green-600">
                                {item.amount.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={2} className="font-semibold">Total Revenue</TableCell>
                          <TableCell className="text-right font-mono font-semibold text-green-600">
                            {totalRevenue.toLocaleString()}
                          </TableCell>
                        </TableRow>

                        {/* Expenses Section */}
                        <TableRow className="bg-red-50 dark:bg-red-900/20">
                          <TableCell colSpan={3} className="font-bold">Expenses</TableCell>
                        </TableRow>
                        {filteredProfitLoss
                          .filter(item => item.category === "Expenses")
                          .map((item, index) => (
                            <TableRow key={`expense-${index}`} className="hover:bg-muted/30">
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.item}</TableCell>
                              <TableCell className="text-right font-mono text-red-600">
                                {Math.abs(item.amount).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={2} className="font-semibold">Total Expenses</TableCell>
                          <TableCell className="text-right font-mono font-semibold text-red-600">
                            {Math.abs(totalExpenses).toLocaleString()}
                          </TableCell>
                        </TableRow>

                        {/* Net Profit/Loss */}
                        <TableRow className="bg-gray-100 dark:bg-gray-800">
                          <TableCell colSpan={2} className="font-bold">Net Profit</TableCell>
                          <TableCell className={`text-right font-mono font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {netProfit.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="detailed" className="m-0 p-6">
                  <p className="text-muted-foreground">Detailed view shows sub-categories and additional metrics.</p>
                </TabsContent>
                
                <TabsContent value="comparative" className="m-0 p-6">
                  <p className="text-muted-foreground">Comparative view shows comparison with previous period or budget.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Summary Cards and Chart */}
          <div className="lg:col-span-3 space-y-4">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">₦{totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-blue-200 dark:bg-blue-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-blue-700 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7c0-1.7-1.3-3-3-3h-1a3 3 0 0 0-3 3v6h4"></path><path d="M5 7c0-1.7 1.3-3 3-3h1a3 3 0 0 1 3 3v6h-4"></path><path d="M5 13v3c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3v-3"></path></svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                      <p className="text-2xl font-bold">₦{Math.abs(totalExpenses).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center bg-red-200 dark:bg-red-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-red-700 dark:text-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                      <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₦{netProfit.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center bg-green-200 dark:bg-green-800 h-12 w-12 justify-center rounded-full">
                      <span className="text-green-700 dark:text-green-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 14-8-8-8 8"></path><path d="M16 18H8a4 4 0 0 1 0-8h8"></path></svg>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-muted-foreground">Profit Margin:</div>
                    <div className="font-medium">
                      {(netProfit / totalRevenue * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Profit Chart */}
            <Card>
              <CardHeader>
                <CardTitle>6-Month Profit Trend</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProfitData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredProfitLoss
                    .filter(item => item.category === "Expenses")
                    .map((expense, index) => {
                      const percentage = Math.abs(expense.amount) / Math.abs(totalExpenses) * 100;
                      return (
                        <div key={`exp-breakdown-${index}`} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{expense.item}</span>
                            <span className="font-medium">{percentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
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
