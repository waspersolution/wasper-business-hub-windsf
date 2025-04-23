import { useSession } from "@/contexts/SessionContext";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { SuperAdminDashboard } from "@/components/SuperAdmin/SuperAdminDashboard";
import { AccountingDashboard } from "@/components/Accounting/AccountingDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'Mon', amount: 34000 },
  { name: 'Tue', amount: 47000 },
  { name: 'Wed', amount: 39000 },
  { name: 'Thu', amount: 42000 },
  { name: 'Fri', amount: 56000 },
  { name: 'Sat', amount: 64000 },
  { name: 'Sun', amount: 28000 },
];

export default function Dashboard() {
  const { session } = useSession();

  // Show super admin dashboard for super admin role
  if (session.currentRole === "super_admin") {
    return (
      <DashboardLayout>
        <SuperAdminDashboard />
      </DashboardLayout>
    );
  }

  // Show accounting dashboard for accounting roles
  if (session.currentRole === "accountant" || session.currentRole === "finance_manager") {
    return (
      <DashboardLayout>
        <AccountingDashboard />
      </DashboardLayout>
    );
  }

  // Regular dashboard for other roles
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your {session.currentRole.replace('_', ' ')} dashboard.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦124,750</div>
              <p className="text-xs text-muted-foreground">+18% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => `₦${value.toLocaleString()}`}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Bar dataKey="amount" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Role specific sections */}
        {session.currentRole === "inventory_manager" && (
          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have 7 items below minimum stock level.</p>
              <p>3 purchase orders pending approval.</p>
            </CardContent>
          </Card>
        )}
        
        {session.currentRole === "sales_manager" && (
          <Card>
            <CardHeader>
              <CardTitle>Sales Targets</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Monthly target: ₦1,500,000</p>
              <p>Current progress: ₦920,000 (61%)</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full w-[61%]"></div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
