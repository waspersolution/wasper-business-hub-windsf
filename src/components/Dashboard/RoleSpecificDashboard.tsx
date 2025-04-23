
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/auth";

interface RoleSpecificDashboardProps {
  role: UserRole;
}

export function RoleSpecificDashboard({ role }: RoleSpecificDashboardProps) {
  if (role === "inventory_manager") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You have 7 items below minimum stock level.</p>
          <p>3 purchase orders pending approval.</p>
        </CardContent>
      </Card>
    );
  }

  if (role === "sales_manager") {
    return (
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
    );
  }

  return null;
}
