
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

const mockPlans = [
  {
    plan: "Starter",
    price: 0,
    users: 2,
    storage: "1GB",
    features: "Basic support, POS, Inventory",
  },
  {
    plan: "Business",
    price: 5000,
    users: 10,
    storage: "10GB",
    features: "All features + Reports",
  },
  {
    plan: "Enterprise",
    price: 25000,
    users: "Unlimited",
    storage: "100GB",
    features: "All features + Priority support",
  },
];

export default function SubscriptionPlans() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Subscription Plans</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan</TableHead>
            <TableHead>Price (₦/mo)</TableHead>
            <TableHead>Users</TableHead>
            <TableHead>Storage</TableHead>
            <TableHead>Key Features</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPlans.map((plan, idx) => (
            <TableRow key={idx}>
              <TableCell>{plan.plan}</TableCell>
              <TableCell>{plan.price === 0 ? "Free" : `₦${plan.price.toLocaleString()}`}</TableCell>
              <TableCell>{plan.users}</TableCell>
              <TableCell>{plan.storage}</TableCell>
              <TableCell>{plan.features}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
