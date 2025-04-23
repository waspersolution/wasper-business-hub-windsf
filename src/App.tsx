
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

// Reports imports
import { CashFlow, ProfitLoss, BalanceSheet, FinancialReports, TrialBalance } from "./pages/reports";

// Accounting imports
import { 
  YearEndClosing,
  ChartOfAccounts,
  JournalEntries,
  Reconciliation,
  BankAccounts,
  TaxSettings,
  Ledgers
} from "./pages/accounting";

// Audit logs imports
import { RecordChanges } from "./pages/audit-logs/RecordChanges";
import { LoginHistory } from "./pages/audit-logs/LoginHistory";
import { UserActivities } from "./pages/audit-logs/UserActivities";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Reports routes */}
        <Route path="/reports/cash-flow" element={<CashFlow />} />
        <Route path="/reports/profit-loss" element={<ProfitLoss />} />
        <Route path="/reports/balance-sheet" element={<BalanceSheet />} />
        <Route path="/reports/financials" element={<FinancialReports />} />
        <Route path="/reports/trial-balance" element={<TrialBalance />} />

        {/* Accounting routes */}
        <Route path="/accounting/year-end-closing" element={<YearEndClosing />} />
        <Route path="/accounting/chart-of-accounts" element={<ChartOfAccounts />} />
        <Route path="/accounting/journal" element={<JournalEntries />} />
        <Route path="/accounting/reconciliation" element={<Reconciliation />} />
        <Route path="/accounting/bank-accounts" element={<BankAccounts />} />
        <Route path="/accounting/tax-settings" element={<TaxSettings />} />
        <Route path="/accounting/ledgers" element={<Ledgers />} />

        {/* Audit logs routes */}
        <Route path="/audit-logs/record-changes" element={<RecordChanges />} />
        <Route path="/audit-logs/login-history" element={<LoginHistory />} />
        <Route path="/audit-logs/user-activities" element={<UserActivities />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
