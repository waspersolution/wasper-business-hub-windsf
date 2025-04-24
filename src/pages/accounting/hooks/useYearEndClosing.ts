
import { useState } from "react";

export interface ClosingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export function useYearEndClosing() {
  const [tasks, setTasks] = useState<ClosingTask[]>([
    {
      id: "reconcile",
      title: "Bank Reconciliation",
      description: "Ensure all bank accounts are reconciled",
      completed: false,
      required: true
    },
    {
      id: "receivables",
      title: "Review Receivables",
      description: "Verify all accounts receivable balances",
      completed: false,
      required: true
    },
    {
      id: "payables",
      title: "Review Payables",
      description: "Verify all accounts payable balances",
      completed: false,
      required: true
    },
    {
      id: "adjustments",
      title: "Post Adjusting Entries",
      description: "Record all year-end adjusting entries",
      completed: false,
      required: true
    },
    {
      id: "depreciation",
      title: "Record Depreciation",
      description: "Calculate and record annual depreciation",
      completed: false,
      required: true
    },
    {
      id: "inventory",
      title: "Inventory Count",
      description: "Perform physical inventory count and adjustments",
      completed: false,
      required: true
    },
    {
      id: "accruals",
      title: "Review Accruals",
      description: "Verify and adjust all accrual entries",
      completed: false,
      required: true
    },
    {
      id: "backup",
      title: "Data Backup",
      description: "Create backup of all accounting data",
      completed: false,
      required: true
    }
  ]);

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const allRequiredTasksCompleted = tasks
    .filter(task => task.required)
    .every(task => task.completed);

  return {
    tasks,
    handleTaskComplete,
    allRequiredTasksCompleted
  };
}
