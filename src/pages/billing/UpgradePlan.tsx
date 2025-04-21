
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, DollarSign } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    plan: "Starter",
    price: 0,
    users: 2,
    features: ["Basic support", "POS", "Inventory", "2 Users", "1GB Storage"],
    popular: false,
  },
  {
    plan: "Business",
    price: 5000,
    users: 10,
    features: ["All features", "Reports", "10 Users", "10GB Storage", "Bank Reconciliation"],
    popular: true,
  },
  {
    plan: "Enterprise",
    price: 25000,
    users: "Unlimited",
    features: ["All features", "Priority support", "Unlimited Users", "100GB Storage", "Custom Integrations", "Dedicated Account Manager"],
    popular: false,
  },
];

export default function UpgradePlan() {
  // Assume "Business" is current plan (as an example)
  const currentPlan = "Business";
  
  const handleUpgrade = (planName: string) => {
    toast.success(`You've selected to upgrade to the ${planName} plan. Our team will contact you shortly.`);
  };

  return (
    <div className="pb-10">
      <div className="flex items-center gap-4 mb-6">
        <DollarSign className="text-wasper-primary" size={28} />
        <h1 className="text-xl font-bold">Upgrade Plan</h1>
      </div>

      {/* Current Plan Card */}
      <Card className="mb-8 border-green-500 shadow-md">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="text-xl font-bold text-green-600">Business Plan</div>
              <div className="text-sm text-gray-500">Your current subscription</div>
            </div>
            <div className="px-4 py-2 bg-green-100 rounded-lg text-green-700 font-medium">
              Active
            </div>
            <div className="text-xl font-bold">
              ₦5,000<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.plan}
            className={`relative border-2 ${currentPlan === plan.plan ? "border-green-600 shadow-xl" : "border-gray-200"} 
              hover:border-wasper-primary hover:shadow-lg transition-all duration-300`}
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
              <ul className="space-y-2 mb-4">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              {currentPlan === plan.plan ? (
                <Button variant="outline" size="sm" disabled className="w-full">
                  Current Plan
                </Button>
              ) : plan.price < plans.find(p => p.plan === currentPlan)?.price! ? (
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleUpgrade(plan.plan)}>
                  Downgrade
                </Button>
              ) : (
                <Button variant="default" size="sm" className="w-full bg-wasper-primary hover:bg-wasper-secondary" onClick={() => handleUpgrade(plan.plan)}>
                  Upgrade
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-slate-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-2">Need a custom plan?</h3>
        <p className="text-muted-foreground mb-4">Contact our sales team for a tailored solution that meets your specific business requirements.</p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
}
