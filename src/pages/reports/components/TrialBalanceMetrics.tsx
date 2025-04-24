
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrialBalanceMetricsProps {
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

export function TrialBalanceMetrics({ totalDebit, totalCredit, isBalanced }: TrialBalanceMetricsProps) {
  const difference = Math.abs(totalDebit - totalCredit);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Debits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₦{totalDebit.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₦{totalCredit.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p className={`text-2xl font-bold ${isBalanced ? "text-green-600" : "text-red-600"}`}>
              {isBalanced ? "Balanced ✓" : "Unbalanced ✗"}
            </p>
            {!isBalanced && (
              <p className="text-sm text-red-600">
                Difference: ₦{difference.toLocaleString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
