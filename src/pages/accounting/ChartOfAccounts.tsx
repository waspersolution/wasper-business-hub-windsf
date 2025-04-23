import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { ChartAccountsFilters } from "./components/ChartAccountsFilters";
import { ChartAccountsTable } from "./components/ChartAccountsTable";
import { NewAccountDialog } from "./components/NewAccountDialog";
import { EditAccountDialog } from "./components/EditAccountDialog";
import { ChartAccountsHeader } from "./components/ChartAccountsHeader";
import { useChartOfAccounts } from "./hooks/useChartOfAccounts";
import { Account, AccountType } from "@/types/accounting";

const mockAccounts: Account[] = [
  {
    id: "A001",
    code: "1000",
    name: "Cash",
    type: "asset",
    subtype: "Current Asset",
    balance: 850000,
    active: true,
    description: "Cash on hand",
    created_at: "2025-01-01",
    updated_at: "2025-04-10"
  },
  {
    id: "A002",
    code: "1010",
    name: "Bank Account",
    type: "asset",
    subtype: "Current Asset",
    balance: 1250000,
    active: true,
    description: "Primary bank account",
    created_at: "2025-01-01",
    updated_at: "2025-04-20"
  },
  // ... more mock accounts
];

const getAccountTypeColor = (type: AccountType): "success" | "danger" | "info" | "warning" | "outline" => {
  switch (type) {
    case "asset": return "success";
    case "liability": return "danger";
    case "equity": return "info";
    case "revenue": return "success";
    case "expense": return "warning";
    default: return "outline";
  }
};

export default function ChartOfAccounts() {
  const {
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    newAccountDialog,
    setNewAccountDialog,
    editAccountDialog,
    setEditAccountDialog,
    selectedAccount,
    filteredAccounts,
    handleEditAccount
  } = useChartOfAccounts(mockAccounts);
  
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <ChartAccountsHeader onNewAccount={() => setNewAccountDialog(true)} />
        <ChartAccountsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ChartAccountsTable
          accounts={filteredAccounts}
          handleEditAccount={handleEditAccount}
          getAccountTypeColor={getAccountTypeColor}
        />
      </div>
      <NewAccountDialog
        open={newAccountDialog}
        setOpen={setNewAccountDialog}
        mockAccounts={mockAccounts}
      />
      <EditAccountDialog
        open={editAccountDialog}
        setOpen={setEditAccountDialog}
        selectedAccount={selectedAccount}
      />
    </DashboardLayout>
  );
}
