
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
import SubscriptionPlans from "./pages/billing/Subscription";
import NotificationTemplates from "./pages/notifications/Templates";
import CompaniesBranches from "./pages/settings/Companies";
import UsersRoles from "./pages/settings/Users";
import Attributes from "./pages/settings/Attributes";
import AuditLogs from "./pages/audit-logs/AuditLogs";
import SalesHistory from "./pages/sales/History";
import SalesCustomers from "./pages/sales/Customers";
import CustomerGroups from "./pages/sales/CustomerGroups";
import DiscountRules from "./pages/sales/Discounts";
import PaymentPlans from "./pages/sales/PaymentPlans";

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
              {/* Inventory routes */}
              <Route path="/inventory/products" element={<Products />} />
              <Route path="/inventory/stock-adjustments" element={<StockAdjustments />} />
              <Route path="/inventory/transfers" element={<Transfers />} />
              <Route path="/inventory/reorder-alerts" element={<ReorderAlerts />} />
              {/* Sales routes */}
              <Route path="/sales" element={<Navigate to="/sales/pos" replace />} />
              <Route path="/sales/pos" element={<POS />} />
              <Route path="/sales/history" element={<SalesHistory />} />
              <Route path="/sales/customers" element={<SalesCustomers />} />
              <Route path="/sales/customer-groups" element={<CustomerGroups />} />
              <Route path="/sales/discounts" element={<DiscountRules />} />
              <Route path="/sales/payment-plans" element={<PaymentPlans />} />
              {/* Purchases routes */}
              <Route path="/purchases/orders" element={<Orders />} />
              <Route path="/purchases/goods-received" element={<GoodsReceived />} />
              <Route path="/purchases/suppliers" element={<Suppliers />} />
              <Route path="/purchases/ledger" element={<PurchasesLedger />} />
              {/* Accounting routes */}
              <Route path="/accounting/ledgers" element={<AccountingLedgers />} />
              <Route path="/accounting/reconciliation" element={<Reconciliation />} />
              <Route path="/accounting/journal" element={<JournalEntries />} />
              <Route path="/accounting/chart-of-accounts" element={<ChartOfAccounts />} />
              <Route path="/accounting/tax-settings" element={<TaxSettings />} />
              <Route path="/accounting/bank-accounts" element={<BankAccounts />} />
              {/* Reports routes */}
              <Route path="/reports/stock" element={<StockReports />} />
              <Route path="/reports/sales" element={<SalesReports />} />
              <Route path="/reports/financials" element={<FinancialReports />} />
              <Route path="/reports/dead-stock" element={<DeadStock />} />
              {/* Billing routes */}
              <Route path="/billing/subscription" element={<SubscriptionPlans />} />
              {/* Notifications routes */}
              <Route path="/notifications/templates" element={<NotificationTemplates />} />
              {/* Settings routes */}
              <Route path="/settings/companies" element={<CompaniesBranches />} />
              <Route path="/settings/users" element={<UsersRoles />} />
              <Route path="/settings/attributes" element={<Attributes />} />
              {/* Audit logs route */}
              <Route path="/audit-logs" element={<AuditLogs />} />
              {/* Default catch-all */}
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
