
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const plans = [
  {
    plan: "Starter",
    price: 0,
    users: 2,
    features: ["Basic support", "POS", "Inventory"],
    popular: false,
  },
  {
    plan: "Business",
    price: 5000,
    users: 10,
    features: ["All features", "Reports"],
    popular: true,
  },
  {
    plan: "Enterprise",
    price: 25000,
    users: "Unlimited",
    features: ["All features", "Priority support"],
    popular: false,
  },
];

export default function UpgradePlan() {
  // Assume "Business" is current plan (as an example)
  const currentPlan = "Business";

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <DollarSign className="text-wasper-primary" size={28} />
        <h1 className="text-xl font-bold">Upgrade Plan</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.plan}
            className={`relative border-2 ${currentPlan === plan.plan ? "border-green-600 shadow-xl" : "border-gray-200"
              }`}
          >
            <CardHeader className="flex flex-col items-center">
              <CardTitle className={`text-lg ${currentPlan === plan.plan ? "text-green-700" : ""}`}>
                {plan.plan}
              </CardTitle>
              <div className="text-2xl font-bold mt-2">
                {plan.price === 0 ? "Free" : `₦${plan.price.toLocaleString()} `}
                <span className="text-base font-normal text-gray-400">/mo</span>
              </div>
              <div className="text-sm text-gray-500 mb-1">{plan.users} Users</div>
              {plan.popular && (
                <span className="absolute top-2 right-2 bg-wasper-primary text-white rounded px-2 py-0.5 text-xs font-medium shadow">
                  Most Popular
                </span>
              )}
              {currentPlan === plan.plan && (
                <span className="absolute top-2 left-2 bg-green-100 text-green-700 rounded px-2 py-0.5 text-xs font-semibold shadow">
                  Your Plan
                </span>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground">
                    • {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              {currentPlan === plan.plan ? (
                <Button variant="success" size="sm" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button variant="info" size="sm">
                  Upgrade
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
