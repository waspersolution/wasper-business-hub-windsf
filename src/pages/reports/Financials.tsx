
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Calendar, Download, Filter, Printer, Search } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "@/components/ui/charts";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";

// Mock data for financial reports
const trialBalanceData = [
  { account_code: "1000", account_name: "Cash in Hand", account_type: "Asset", debit: 25000, credit: 0, balance: 25000 },
  { account_code: "1010", account_name: "Bank Current Account", account_type: "Asset", debit: 165000, credit: 0, balance: 165000 },
  { account_code: "1020", account_name: "Accounts Receivable", account_type: "Asset", debit: 87500, credit: 0, balance: 87500 },
  { account_code: "2000", account_name: "Accounts Payable", account_type: "Liability", debit: 0, credit: 45000, balance: -45000 },
  { account_code: "2010", account_name: "Short-term Loans", account_type: "Liability", debit: 0, credit: 75000, balance: -75000 },
  { account_code: "3000", account_name: "Capital", account_type: "Equity", debit: 0, credit: 100000, balance: -100000 },
  { account_code: "3010", account_name: "Retained Earnings", account_type: "Equity", debit: 0, credit: 57500, balance: -57500 },
  { account_code: "4000", account_name: "Sales Revenue", account_type: "Income", debit: 0, credit: 320000, balance: -320000 },
  { account_code: "5000", account_name: "Cost of Goods Sold", account_type: "Expense", debit: 192000, credit: 0, balance: 192000 },
  { account_code: "5010", account_name: "Salaries Expense", account_type: "Expense", debit: 78000, credit: 0, balance: 78000 },
  { account_code: "5020", account_name: "Rent Expense", account_type: "Expense", debit: 25000, credit: 0, balance: 25000 },
  { account_code: "5030", account_name: "Utilities Expense", account_type: "Expense", debit: 15000, credit: 0, balance: 15000 },
  { account_code: "5040", account_name: "Office Supplies", account_type: "Expense", debit: 10000, credit: 0, balance: 10000 },
];

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

// Monthly profit data for chart
const monthlyProfitData = [
  { month: "Jan", revenue: 280000, expenses: 232000, profit: 48000 },
  { month: "Feb", revenue: 290000, expenses: 235000, profit: 55000 },
  { month: "Mar", revenue: 310000, expenses: 245000, profit: 65000 },
  { month: "Apr", revenue: 320000, expenses: 258000, profit: 62000 },
  { month: "May", revenue: 350000, expenses: 275000, profit: 75000 },
  { month: "Jun", revenue: 380000, expenses: 290000, profit: 90000 },
];

export default function FinancialReports() {
  const [activeTab, setActiveTab] = useState("trialBalance");
  const [period, setPeriod] = useState("2025-04");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountType, setAccountType] = useState("all");
  
  // Filter trial balance data based on search and account type
  const filteredTrialBalance = trialBalanceData.filter((item) => {
    const matchesSearch = 
      item.account_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.account_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = accountType === "all" || item.account_type.toLowerCase() === accountType.toLowerCase();
    return matchesSearch && matchesType;
  });

  // Calculate trial balance totals
  const trialBalanceTotals = filteredTrialBalance.reduce(
    (acc, item) => {
      acc.debit += item.debit;
      acc.credit += item.credit;
      return acc;
    },
    { debit: 0, credit: 0 }
  );

  // Calculate P&L totals
  const profitLossTotals = profitLossData.reduce(
    (acc, item) => {
      if (item.category === "Revenue") {
        acc.revenue += item.amount;
      } else {
        acc.expenses += Math.abs(item.amount);
      }
      return acc;
    },
    { revenue: 0, expenses: 0 }
  );
  
  const netProfit = profitLossTotals.revenue - profitLossTotals.expenses;

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground mt-1">
              View and analyze your company's financial performance
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
                <label className="text-sm font-medium mb-1 block">Account Type</label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-auto">
                <Button className="w-full md:w-auto">
                  <Calendar className="w-4 h-4 mr-2" />
                  Custom Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Content */}
        <Card className="overflow-hidden">
          <Tabs defaultValue="trialBalance" onValueChange={setActiveTab} className="w-full">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Financial Statements</CardTitle>
                  <CardDescription>
                    View your company's detailed financial statements
                  </CardDescription>
                </div>
                <TabsList className="grid w-full sm:w-auto grid-cols-3 md:grid-cols-3">
                  <TabsTrigger value="trialBalance">Trial Balance</TabsTrigger>
                  <TabsTrigger value="profitLoss">Profit & Loss</TabsTrigger>
                  <TabsTrigger value="cashFlow">Cash Flow</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 pt-4">
              {/* Trial Balance Tab */}
              <TabsContent value="trialBalance" className="m-0">
                <div className="p-4 border-b bg-muted/20">
                  <h3 className="font-semibold text-lg">Trial Balance</h3>
                  <p className="text-sm text-muted-foreground">Period: {period}</p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow>
                        <TableHead>Account Code</TableHead>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Debit (₦)</TableHead>
                        <TableHead className="text-right">Credit (₦)</TableHead>
                        <TableHead className="text-right">Balance (₦)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTrialBalance.map((item, index) => (
                        <TableRow key={index} className="hover:bg-muted/30">
                          <TableCell>{item.account_code}</TableCell>
                          <TableCell className="font-medium">{item.account_name}</TableCell>
                          <TableCell>{item.account_type}</TableCell>
                          <TableCell className="text-right font-mono">
                            {item.debit > 0 ? item.debit.toLocaleString() : "—"}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {item.credit > 0 ? item.credit.toLocaleString() : "—"}
                          </TableCell>
                          <TableCell className={`text-right font-mono ${item.balance < 0 ? "text-red-600" : "text-green-600"}`}>
                            {item.balance.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <tfoot className="border-t bg-muted/50">
                      <tr>
                        <td colSpan={3} className="p-4 font-bold">Total</td>
                        <td className="p-4 text-right font-mono font-bold">{trialBalanceTotals.debit.toLocaleString()}</td>
                        <td className="p-4 text-right font-mono font-bold">{trialBalanceTotals.credit.toLocaleString()}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </Table>
                </div>
              </TabsContent>

              {/* Profit and Loss Tab */}
              <TabsContent value="profitLoss" className="m-0">
                <div className="p-4 border-b bg-muted/20">
                  <h3 className="font-semibold text-lg">Profit & Loss Statement</h3>
                  <p className="text-sm text-muted-foreground">Period: {period}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
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
                        {profitLossData
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
                            {profitLossTotals.revenue.toLocaleString()}
                          </TableCell>
                        </TableRow>

                        {/* Expenses Section */}
                        <TableRow className="bg-red-50 dark:bg-red-900/20">
                          <TableCell colSpan={3} className="font-bold">Expenses</TableCell>
                        </TableRow>
                        {profitLossData
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
                            {profitLossTotals.expenses.toLocaleString()}
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

                  <div className="h-80 flex flex-col">
                    <h4 className="font-medium mb-2 text-center">6-Month Profit Trend</h4>
                    <div className="flex-1">
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
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Cash Flow Tab */}
              <TabsContent value="cashFlow" className="m-0">
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
                      {/* Operating Activities */}
                      <TableRow className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                        <TableCell colSpan={3}>Operating Activities</TableCell>
                      </TableRow>
                      {cashFlowData
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
                      {cashFlowData
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
                      {cashFlowData
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
                      {cashFlowData
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
                      {cashFlowData
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
                      {cashFlowData
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
                      {cashFlowData
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
                      {cashFlowData
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
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

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
