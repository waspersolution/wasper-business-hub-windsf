
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

export function SalesChart() {
  return (
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
  );
}
