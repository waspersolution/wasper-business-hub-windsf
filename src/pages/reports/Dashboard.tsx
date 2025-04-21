
import React, { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  BarChart2, 
  PieChart as PieChartIcon, 
  Calendar, 
  Filter, 
  Save, 
  Download,
  Share,
  Plus
} from "lucide-react";

// Mock data for reports
const salesData = [
  { name: 'Jan', value: 120000 },
  { name: 'Feb', value: 150000 },
  { name: 'Mar', value: 185000 },
  { name: 'Apr', value: 220000 },
  { name: 'May', value: 195000 },
  { name: 'Jun', value: 240000 }
];

const stockData = [
  { name: 'Rice', value: 350000 },
  { name: 'Oil', value: 180000 },
  { name: 'Pasta', value: 120000 },
  { name: 'Flour', value: 90000 },
  { name: 'Sugar', value: 70000 }
];

const purchaseData = [
  { name: 'Vendor A', value: 320000 },
  { name: 'Vendor B', value: 180000 },
  { name: 'Vendor C', value: 155000 },
  { name: 'Vendor D', value: 120000 },
  { name: 'Others', value: 95000 }
];

const profitLossData = [
  { name: 'Jan', revenue: 120000, expenses: 80000, profit: 40000 },
  { name: 'Feb', revenue: 150000, expenses: 95000, profit: 55000 },
  { name: 'Mar', revenue: 185000, expenses: 110000, profit: 75000 },
  { name: 'Apr', revenue: 220000, expenses: 130000, profit: 90000 },
  { name: 'May', revenue: 195000, expenses: 125000, profit: 70000 },
  { name: 'Jun', revenue: 240000, expenses: 145000, profit: 95000 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Business Reports</h1>
            <p className="text-muted-foreground">
              View and analyze your business performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start border-b rounded-none px-0 mb-4">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Sales Reports
            </TabsTrigger>
            <TabsTrigger value="stock" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Stock Reports
            </TabsTrigger>
            <TabsTrigger value="purchase" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Purchase Reports
            </TabsTrigger>
            <TabsTrigger value="accounting" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Accounting Reports
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Custom
            </TabsTrigger>
            <TabsTrigger value="saved" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Business Performance Overview</CardTitle>
                  <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={profitLossData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => `₦${value.toLocaleString()}`}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Bar dataKey="revenue" fill="#4f46e5" />
                        <Bar dataKey="expenses" fill="#ef4444" />
                        <Bar dataKey="profit" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md text-purple-600 dark:text-purple-400">Sales Distribution</CardTitle>
                    <BarChart2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md text-green-600 dark:text-green-400">Stock Value</CardTitle>
                    <PieChartIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                        <Pie
                          data={stockData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {stockData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md text-amber-600 dark:text-amber-400">Purchase Distribution</CardTitle>
                    <PieChartIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
                        <Pie
                          data={purchaseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {purchaseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="mt-0">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sales Reports</CardTitle>
                      <CardDescription>Analyze your sales data by different metrics</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
                      <a href="/reports/sales">
                        <BarChart2 className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="font-medium">Sales Summary</span>
                        <span className="text-xs text-muted-foreground">Monthly sales overview</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
                      <a href="/reports/sales-periods">
                        <Calendar className="h-8 w-8 mb-2 text-green-500" />
                        <span className="font-medium">Daily/Weekly/Monthly</span>
                        <span className="text-xs text-muted-foreground">Period-based analysis</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-200 dark:hover:border-purple-800" asChild>
                      <a href="/reports/top-products">
                        <TrendingUp className="h-8 w-8 mb-2 text-purple-500" />
                        <span className="font-medium">Top Selling Products</span>
                        <span className="text-xs text-muted-foreground">Best performing inventory</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
                      <a href="/reports/customer-summary">
                        <UsersIcon className="h-8 w-8 mb-2 text-amber-500" />
                        <span className="font-medium">Customer Summary</span>
                        <span className="text-xs text-muted-foreground">Customer purchasing patterns</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stock" className="mt-0">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Stock Reports</CardTitle>
                      <CardDescription>Inventory analysis and stock management</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
                      <a href="/reports/stock">
                        <BarChart className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="font-medium">Stock Summary</span>
                        <span className="text-xs text-muted-foreground">Current inventory status</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
                      <a href="/reports/stock-movement">
                        <TrendingUp className="h-8 w-8 mb-2 text-green-500" />
                        <span className="font-medium">Stock Movement</span>
                        <span className="text-xs text-muted-foreground">Inventory flow analysis</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-200 dark:hover:border-purple-800" asChild>
                      <a href="/reports/valuation">
                        <DollarSign className="h-8 w-8 mb-2 text-purple-500" />
                        <span className="font-medium">Valuation Report</span>
                        <span className="text-xs text-muted-foreground">Inventory value assessment</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
                      <a href="/reports/dead-stock">
                        <Archive className="h-8 w-8 mb-2 text-amber-500" />
                        <span className="font-medium">Dead Stock</span>
                        <span className="text-xs text-muted-foreground">Non-moving inventory</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="purchase" className="mt-0">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Purchase Reports</CardTitle>
                      <CardDescription>Supplier and procurement analytics</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
                      <a href="/reports/purchase-summary">
                        <BarChart className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="font-medium">Purchase Summary</span>
                        <span className="text-xs text-muted-foreground">Procurement overview</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
                      <a href="/reports/supplier-purchases">
                        <User className="h-8 w-8 mb-2 text-green-500" />
                        <span className="font-medium">Supplier-wise Purchases</span>
                        <span className="text-xs text-muted-foreground">Vendor analysis</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounting" className="mt-0">
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Accounting Reports</CardTitle>
                      <CardDescription>Financial statements and analysis</CardDescription>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      New Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-200 dark:hover:border-blue-800" asChild>
                      <a href="/reports/trial-balance">
                        <BarChart className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="font-medium">Trial Balance</span>
                        <span className="text-xs text-muted-foreground">Account balances</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-200 dark:hover:border-green-800" asChild>
                      <a href="/reports/profit-loss">
                        <DollarSign className="h-8 w-8 mb-2 text-green-500" />
                        <span className="font-medium">Profit & Loss</span>
                        <span className="text-xs text-muted-foreground">Income statement</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-200 dark:hover:border-purple-800" asChild>
                      <a href="/reports/balance-sheet">
                        <Layers className="h-8 w-8 mb-2 text-purple-500" />
                        <span className="font-medium">Balance Sheet</span>
                        <span className="text-xs text-muted-foreground">Financial position</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="h-32 flex flex-col items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-200 dark:hover:border-amber-800" asChild>
                      <a href="/reports/journal">
                        <BookIcon className="h-8 w-8 mb-2 text-amber-500" />
                        <span className="font-medium">Journal Report</span>
                        <span className="text-xs text-muted-foreground">Transaction details</span>
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-0">
            <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
              <Layout className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Custom Report Builder</h3>
              <p className="text-muted-foreground max-w-md">
                Create your own custom reports by dragging and dropping fields, applying filters, and visualizing data your way.
              </p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Custom Report
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
              <Save className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Saved Reports</h3>
              <p className="text-muted-foreground max-w-md">
                You haven't saved any reports yet. Save reports for quick access to frequently used analytics.
              </p>
              <Button className="gap-2" variant="outline">
                <Plus className="h-4 w-4" />
                Browse Reports
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
