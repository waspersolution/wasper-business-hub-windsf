
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, ShieldAlert, Calendar } from "lucide-react";
import { useYearEndClosing } from "./hooks/useYearEndClosing";

export default function YearEndClosing() {
  const { tasks, handleTaskComplete, allRequiredTasksCompleted } = useYearEndClosing();
  const currentYear = new Date().getFullYear();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Year-End Closing {currentYear}</h1>
            <p className="text-muted-foreground">Complete year-end closing procedures</p>
          </div>
          <Button
            disabled={!allRequiredTasksCompleted}
            onClick={() => {}}
            className="bg-red-600 hover:bg-red-700"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Close Fiscal Year {currentYear}
          </Button>
        </div>

        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Critical Operation</AlertTitle>
          <AlertDescription>
            Year-end closing is irreversible. All required tasks must be completed and verified before proceeding.
            This will permanently lock all transactions for the year {currentYear}.
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
                  <div className="grid gap-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{task.title}</CardTitle>
                      {task.required && (
                        <span className="text-sm text-red-500">Required</span>
                      )}
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {allRequiredTasksCompleted 
              ? "✓ All required tasks completed" 
              : "⚠ Complete all required tasks to proceed"}
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Download Checklist
            </Button>
            <Button
              disabled={!allRequiredTasksCompleted}
              className="bg-red-600 hover:bg-red-700"
            >
              Proceed with Year-End Closing
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
