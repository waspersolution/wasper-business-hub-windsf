
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const transactions = [
  {
    id: 1,
    date: "2024-04-23",
    description: "Sales Revenue",
    amount: 25000,
    type: "credit"
  },
  {
    id: 2,
    date: "2024-04-23",
    description: "Office Supplies",
    amount: -1500,
    type: "debit"
  },
  {
    id: 3,
    date: "2024-04-22",
    description: "Utility Payment",
    amount: -4500,
    type: "debit"
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <div
                className={`font-mono font-medium ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"}₦
                {Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
