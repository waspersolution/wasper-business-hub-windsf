
import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { FileCheck, ShieldAlert } from "lucide-react";

interface ClosingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function YearEndClosing() {
  const [tasks, setTasks] = useState<ClosingTask[]>([
    {
      id: "reconcile",
      title: "Bank Reconciliation",
      description: "Ensure all bank accounts are reconciled",
      completed: false
    },
    {
      id: "receivables",
      title: "Review Receivables",
      description: "Verify all accounts receivable balances",
      completed: false
    },
    {
      id: "payables",
      title: "Review Payables",
      description: "Verify all accounts payable balances",
      completed: false
    },
    {
      id: "adjustments",
      title: "Post Adjusting Entries",
      description: "Record all year-end adjusting entries",
      completed: false
    },
    {
      id: "depreciation",
      title: "Record Depreciation",
      description: "Calculate and record annual depreciation",
      completed: false
    }
  ]);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const allTasksCompleted = tasks.every(task => task.completed);

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Year-End Closing</h1>
            <p className="text-muted-foreground">Complete year-end closing procedures</p>
          </div>
          <Button
            disabled={!allTasksCompleted}
            onClick={() => {}}
            className="bg-red-600 hover:bg-red-700"
          >
            <FileCheck className="mr-2 h-4 w-4" />
            Close Fiscal Year
          </Button>
        </div>

        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Important Notice</AlertTitle>
          <AlertDescription>
            Year-end closing is irreversible. Ensure all tasks are completed and verified before proceeding.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="py-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => handleTaskComplete(task.id)}
                  />
                  <div className="grid gap-1.5">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
