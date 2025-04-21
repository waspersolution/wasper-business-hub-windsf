
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";

const mockPlans = [
  {
    plan: "Starter",
    price: 0,
    users: 2,
    storage: "1GB",
    features: ["Basic support", "POS", "Inventory"],
    current: false,
  },
  {
    plan: "Business",
    price: 5000,
    users: 10,
    storage: "10GB",
    features: ["All features", "Reports", "Bank reconciliation"],
    current: true,
  },
  {
    plan: "Enterprise",
    price: 25000,
    users: "Unlimited",
    storage: "100GB",
    features: ["All features", "Priority support", "Custom integrations"],
    current: false,
  },
];

export default function SubscriptionPlans() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <CreditCard className="text-wasper-primary" size={28} />
        <h1 className="text-xl font-bold">Subscription Plans</h1>
      </div>
      
      {/* Current Plan Summary */}
      <Card className="mb-8 border-green-500 shadow-md">
        <CardHeader>
          <CardTitle className="text-base">Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="text-xl font-bold text-green-600">Business Plan</div>
              <div className="text-sm text-gray-500">Next billing date: April 14, 2025</div>
            </div>
            <div className="px-4 py-2 bg-green-100 rounded-lg text-green-700 font-medium">
              Active
            </div>
            <div className="text-xl font-bold">
              ₦5,000<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div>
              <Button variant="outline" size="sm">Manage Billing</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Plan Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Plan Features Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Feature</TableHead>
                  <TableHead>Starter</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Enterprise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  <TableCell>Free</TableCell>
                  <TableCell className="font-semibold">₦5,000/mo</TableCell>
                  <TableCell>₦25,000/mo</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Users</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell className="font-semibold">10</TableCell>
                  <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Storage</TableCell>
                  <TableCell>1GB</TableCell>
                  <TableCell className="font-semibold">10GB</TableCell>
                  <TableCell>100GB</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">POS</TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                  <TableCell className="font-semibold"><Check size={18} className="text-green-500" /></TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Inventory</TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                  <TableCell className="font-semibold"><Check size={18} className="text-green-500" /></TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Reports</TableCell>
                  <TableCell>Basic only</TableCell>
                  <TableCell className="font-semibold"><Check size={18} className="text-green-500" /></TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bank Reconciliation</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-semibold"><Check size={18} className="text-green-500" /></TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Priority Support</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-semibold">-</TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Custom Integrations</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="font-semibold">-</TableCell>
                  <TableCell><Check size={18} className="text-green-500" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-6">
            <Button variant="default" size="sm" className="bg-wasper-primary hover:bg-wasper-secondary">
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
