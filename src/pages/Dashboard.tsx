
import { useSession } from "@/contexts/SessionContext";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { SuperAdminDashboard } from "@/components/SuperAdmin/SuperAdminDashboard";
import { AccountingDashboard } from "@/components/Accounting/AccountingDashboard";
import { DashboardMetrics } from "@/components/Dashboard/DashboardMetrics";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { RoleSpecificDashboard } from "@/components/Dashboard/RoleSpecificDashboard";
import { UserRole } from "@/types/auth";

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
        
        <DashboardMetrics />
        <SalesChart />
        
        {/* Role specific sections */}
        <RoleSpecificDashboard role={session.currentRole} />
      </div>
    </DashboardLayout>
  );
}
