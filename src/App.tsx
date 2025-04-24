import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionProvider } from "@/contexts/SessionContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import POS from "./pages/sales/POS";
import Products from "./pages/inventory/Products";
import StockAdjustments from "./pages/inventory/StockAdjustments";
import Transfers from "./pages/inventory/Transfers";
import ReorderAlerts from "./pages/inventory/ReorderAlerts";
import Orders from "./pages/purchases/Orders";
import GoodsReceived from "./pages/purchases/GoodsReceived";
import Suppliers from "./pages/purchases/Suppliers";
import PurchasesLedger from "./pages/purchases/Ledger";
import AccountingLedgers from "./pages/accounting/Ledgers";
import Reconciliation from "./pages/accounting/Reconciliation";
import JournalEntries from "./pages/accounting/JournalEntries";
import ChartOfAccounts from "./pages/accounting/ChartOfAccounts";
import TaxSettings from "./pages/accounting/TaxSettings";
import BankAccounts from "./pages/accounting/BankAccounts";
import StockReports from "./pages/reports/Stock";
import SalesReports from "./pages/reports/Sales";
import FinancialReports from "./pages/reports/Financials";
import DeadStock from "./pages/reports/DeadStock";
import ReportsDashboard from "./pages/reports/Dashboard";
import SubscriptionPlans from "./pages/billing/Subscription";
import PaymentHistory from "./pages/billing/PaymentHistory";
import UpgradePlan from "./pages/billing/UpgradePlan";
import NotificationTemplates from "./pages/notifications/Templates";
import CompaniesBranches from "./pages/settings/Companies";
import UsersRoles from "./pages/settings/Users";
import Permissions from "./pages/settings/Permissions";
import Attributes from "./pages/settings/Attributes";
import Settings from "./pages/settings/Settings";
import BackupRestore from "./pages/settings/BackupRestore";
import AuditLogs from "./pages/audit-logs/AuditLogs";
import SalesHistory from "./pages/sales/History";
import SalesCustomers from "./pages/sales/Customers";
import CustomerGroups from "./pages/sales/CustomerGroups";
import DiscountRules from "./pages/sales/Discounts";
import PaymentPlans from "./pages/sales/PaymentPlans";
import ProductImport from "./pages/extras/imports/ProductImport";
import CustomerImport from "./pages/extras/imports/CustomerImport";
import SalesImport from "./pages/extras/imports/SalesImport";
import Attachments from "./pages/extras/documents/Attachments";
import BalanceSheet from "./pages/reports/BalanceSheet";
import CashFlow from "./pages/reports/CashFlow";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory/products" element={<Products />} />
              <Route path="/inventory/stock-adjustments" element={<StockAdjustments />} />
              <Route path="/inventory/transfers" element={<Transfers />} />
              <Route path="/inventory/reorder-alerts" element={<ReorderAlerts />} />
              <Route path="/sales" element={<Navigate to="/sales/pos" replace />} />
              <Route path="/sales/pos" element={<POS />} />
              <Route path="/sales/history" element={<SalesHistory />} />
              <Route path="/sales/customers" element={<SalesCustomers />} />
              <Route path="/sales/customer-groups" element={<CustomerGroups />} />
              <Route path="/sales/discounts" element={<DiscountRules />} />
              <Route path="/sales/payment-plans" element={<PaymentPlans />} />
              <Route path="/purchases/orders" element={<Orders />} />
              <Route path="/purchases/goods-received" element={<GoodsReceived />} />
              <Route path="/purchases/suppliers" element={<Suppliers />} />
              <Route path="/purchases/ledger" element={<PurchasesLedger />} />
              <Route path="/accounting/ledgers" element={<AccountingLedgers />} />
              <Route path="/accounting/reconciliation" element={<Reconciliation />} />
              <Route path="/accounting/journal" element={<JournalEntries />} />
              <Route path="/accounting/chart-of-accounts" element={<ChartOfAccounts />} />
              <Route path="/accounting/tax-settings" element={<TaxSettings />} />
              <Route path="/accounting/bank-accounts" element={<BankAccounts />} />
              <Route path="/reports" element={<ReportsDashboard />} />
              <Route path="/reports/stock" element={<StockReports />} />
              <Route path="/reports/sales" element={<SalesReports />} />
              <Route path="/reports/financials" element={<FinancialReports />} />
              <Route path="/reports/dead-stock" element={<DeadStock />} />
              <Route path="/reports/stock-movement" element={<StockReports />} />
              <Route path="/reports/valuation" element={<StockReports />} />
              <Route path="/reports/sales-periods" element={<SalesReports />} />
              <Route path="/reports/top-products" element={<SalesReports />} />
              <Route path="/reports/customer-summary" element={<SalesReports />} />
              <Route path="/reports/purchase-summary" element={<FinancialReports />} />
              <Route path="/reports/supplier-purchases" element={<FinancialReports />} />
              <Route path="/reports/trial-balance" element={<FinancialReports />} />
              <Route path="/reports/profit-loss" element={<FinancialReports />} />
              <Route path="/reports/balance-sheet" element={<BalanceSheet />} />
              <Route path="/reports/cash-flow" element={<CashFlow />} />
              <Route path="/reports/journal" element={<FinancialReports />} />
              <Route path="/reports/custom" element={<ReportsDashboard />} />
              <Route path="/reports/saved" element={<ReportsDashboard />} />
              <Route path="/billing/subscription" element={<SubscriptionPlans />} />
              <Route path="/billing/history" element={<PaymentHistory />} />
              <Route path="/billing/upgrade" element={<UpgradePlan />} />
              <Route path="/notifications/templates" element={<NotificationTemplates />} />
              <Route path="/notifications/email" element={<Navigate to="/notifications/templates" replace />} />
              <Route path="/notifications/sms" element={<Navigate to="/notifications/templates" replace />} />
              <Route path="/notifications/system-alerts" element={<Navigate to="/notifications/templates" replace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/companies" element={<CompaniesBranches />} />
              <Route path="/settings/users" element={<UsersRoles />} />
              <Route path="/settings/permissions" element={<Permissions />} />
              <Route path="/settings/attributes" element={<Attributes />} />
              <Route path="/settings/backup-restore" element={<BackupRestore />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
              <Route path="/audit-logs/user-activities" element={<Navigate to="/audit-logs" replace state={{ tab: "user-activities" }} />} />
              <Route path="/audit-logs/login-history" element={<Navigate to="/audit-logs" replace state={{ tab: "login-history" }} />} />
              <Route path="/audit-logs/record-changes" element={<Navigate to="/audit-logs" replace state={{ tab: "record-changes" }} />} />
              <Route path="/extras/imports/products" element={<ProductImport />} />
              <Route path="/extras/imports/customers" element={<CustomerImport />} />
              <Route path="/extras/imports/sales" element={<SalesImport />} />
              <Route path="/extras/documents/attachments" element={<Attachments />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Sonner />
          </TooltipProvider>
        </SessionProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
